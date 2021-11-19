import { ClientPath, ServerPath } from './dataPath';

export const AuthType = {
  SignUp: 'signUp',
  EmailReauthorization: 'email',
  SignIn: 'signIn',
};
Object.freeze(AuthType);

export const authData = {
  signUp: {
    type: AuthType.SignUp,
    title: '회원가입',
    LinkMessage1: '회원이신가요? 로그인하세요',
    LinkMessage2: '회원인증메일 발송',
    LinkMessage1Path: ClientPath.SignIn,
    LinkMessage2Path: ClientPath.EmailReauthorization,
    submitBtn: '회원가입',
  },
  emailReauthorization: {
    type: AuthType.EmailReauthorization,
    title: '인증 이메일 재발송',
    LinkMessage1: '',
    LinkMessage2: '',
    LinkMessage1Path: '',
    LinkMessage2Path: '',
    submitBtn: '회원인증메일 재발송',
  },
  signIn: {
    type: AuthType.SignIn,
    title: '로그인',
    LinkMessage1: '회원이 아니신가요? 가입하세요',
    LinkMessage2: '회원인증메일 발송',
    LinkMessage1Path: ClientPath.SignUp,
    LinkMessage2Path: ClientPath.EmailReauthorization,
    submitBtn: '로그인'
  }
}

export const getAuthenticateUrl = (authenticateType) => {
  switch(authenticateType) {
    case AuthType.SignUp:
      return `${process.env.REACT_APP_SERVER_ORIGIN}${ServerPath.SignUp}`;
    case AuthType.EmailReauthorization:
      return `${process.env.REACT_APP_SERVER_ORIGIN}${ServerPath.EmailReauthorization}`;
    case AuthType.SignIn:
      return `${process.env.REACT_APP_SERVER_ORIGIN}${ServerPath.SignIn}`;
    default:
      throw new Error('invalid authenticateType');
  }
}

export const getAuthenticationHeader = (accessToken) => {
  return `Bearer ${accessToken}`;
}