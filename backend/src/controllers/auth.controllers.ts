import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import { AuthEmail } from '../models/authEmail';
import { Token } from '../models/token';
import { User } from '../models/user';
import sendEmailToValidate from '../utils/emailAuth';
import { jsonErrorResponse } from '../utils/jsonResponse/fail';
import { jsonResponse } from '../utils/jsonResponse/success';
import { generateAccessToken } from '../utils/token';
import {
  ErrorMessage,
  RefreshToken,
  SignupData,
  SuccessMessage,
  UserAccessToken,
} from '../utils/type/auth';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: SignupData = req.body;
    const exUser = await User.getUser(email);
    if (exUser) {
      res.status(400);
      return res.json(
        jsonErrorResponse(req, { message: `${ErrorMessage.SameEmail}` })
      );
    }

    const bcryptPassword: string = await bcrypt.hash(password, 12);
    const newUser = await User.createUser(email, bcryptPassword);
    await sendEmailToValidate(await User.getUser(email));
    if (newUser) {
      res.status(201);
      return res.json(
        jsonResponse(req, { message: `${SuccessMessage.VerifyEmail}` }, 201)
      );
    }
  } catch (err) {
    next(err);
  }
};

const verifySignupEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { key, id } = req.query as unknown as { key: string; id: string };
    const randomKey = await AuthEmail.isValidKey(key, Number(id));

    if (!randomKey) {
      res.status(403);
      return res.json(
        jsonErrorResponse(
          req,
          { message: `${ErrorMessage.EmailValidationTimeOut}` },
          403
        )
      );
    }

    await User.userCheckedEmail(Number(id));
    await AuthEmail.deleteRandomKey(randomKey.id);

    res.status(200);
    res.json(
      jsonResponse(req, { message: `${SuccessMessage.VerifyEmailComplete}` })
    );
  } catch (err) {
    next(err);
  }
};

const resendSignupEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const exUser: User = res.locals.exUser;
    await sendEmailToValidate(exUser);

    res.status(200);
    res.json(
      jsonResponse(req, { message: SuccessMessage.RecertificationEmail })
    );
  } catch (err) {
    next(err);
  }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      const status: number =
        info.message === ErrorMessage.DidNotVerifyEmailYet ? 401 : 400;
      res.status(status);
      return res.json(jsonErrorResponse(req, info, status));
    }

    req.login(user, { session: false }, async (loginError) => {
      if (loginError) {
        next(loginError);
      }

      const { id, email }: User = user;
      const tokenData: UserAccessToken = { id, email };

      const accessToken = generateAccessToken(tokenData);
      const refreshToken = jwt.sign(
        tokenData,
        `${process.env.JWT_REFRESH_SECRET}`
      );

      const exRefreshToken = await Token.isRefreshTokenExist(id);
      if (exRefreshToken) {
        await Token.deleteRefreshToken(exRefreshToken.refreshToken);
      }
      await Token.setRefreshToken(user, refreshToken);

      res.cookie(`${process.env.JWT_REFRESH_TOKEN}`, refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      res.json(jsonResponse(req, { user_id: user.id, accessToken }));
    });
  })(req, res, next);
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.logOut();
    res.clearCookie(`${process.env.JWT_REFRESH_TOKEN}`);
    await Token.deleteRefreshToken(
      req.cookies[`${process.env.JWT_REFRESH_TOKEN}`]
    );
    res.status(204);
    res.json(jsonResponse(req, {}, 204));
  } catch (err) {
    next(err);
  }
};

const generateRefreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = res.locals;

  jwt.verify(
    refreshToken,
    `${process.env.JWT_REFRESH_SECRET}`,
    (err: any, user: any) => {
      const { iat, ...userInfo } = user as RefreshToken;

      if (err) {
        res.status(403);
        return res.json(
          jsonErrorResponse(req, { message: 'token expired' }, 403)
        );
      }
      const accessToken = generateAccessToken(userInfo);
      res.status(201);
      res.json(jsonResponse(req, { accessToken: accessToken }, 201));
    }
  );
};

export default {
  signup,
  verifySignupEmail,
  resendSignupEmail,
  signin,
  logout,
  generateRefreshToken,
};
