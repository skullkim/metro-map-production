import  {useFormik} from "formik";
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import {useCallback, useState} from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { AuthType, getAuthenticateUrl } from '../../lib/authenticateData';
import { Api } from '../../lib/customAxios';
import { setUserInfo } from '../../lib/localStorage';
import { maxLen, RegExp, WarningMessage } from '../../lib/validateUserInfo';
import indexStore from '../../stores/indexStore';
import { Form, Input, InputTitle, LinkMessage, PageTitle, SubmitBtn, Wrapper } from '../styles/Authorization';
import { Success, Warning } from '../styles/ResultMessage';



const ValidateUserAccount = ({authData}) => {
  const {type, title, LinkMessage1, LinkMessage2, LinkMessage1Path, LinkMessage2Path, submitBtn} = authData;
  const [currentFocused, setCurrentFocused] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const history = useHistory();
  const {Login} = indexStore();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      verifyPassword: '',
    },
    validationSchema: yup.object({
      email: yup.string()
        .required(`${WarningMessage.EmptyEmail}`)
        .matches(RegExp.Email, {message: `${WarningMessage.InvalidEmail}`})
        .max(maxLen, `${WarningMessage.MaxLen}`),

      password: type !== AuthType.EmailReauthorization ? yup.string()
        .required(`${WarningMessage.EmptyPassword}`)
        .matches(RegExp.Password, {message: `${WarningMessage.InvalidPassword}`})
        .max(maxLen, `${WarningMessage.MaxLen}`) : '',

      verifyPassword: type === AuthType.SignUp ? yup.string()
        .required(`${WarningMessage.EmptyPassword}`)
        .matches(RegExp.Password, {message: `${WarningMessage.InvalidPassword}`})
        .max(maxLen, `${WarningMessage.MaxLen}`)
        .oneOf([yup.ref('password')], `${WarningMessage.VerifyPasswordNotEqual}`) : '',
    }),

    onSubmit: ({email, password}) => {
      const data = type === AuthType.EmailReauthorization ?
        {email} :
        {email, password};
      const url = getAuthenticateUrl(type);

      Api({
        method: 'POST',
        url,
        data,
      })
        .then((response) => {
          if(type !== AuthType.SignIn) {
            const {data: {data: {message}}} = response;
            setSuccessMessage(message);
          }
          else {
            const {data: {data: {user_id: userId, accessToken}}} = response;
            setUserInfo(userId, accessToken);
            Login.setUserId(userId);
            history.push(`/`);
          }
        })
        .catch(err => {
          if(err.response) {
            const {response: {status, data: {error: {message}}}} = err;
            if(status === 400 ||
                (type === AuthType.EmailReauthorization && status === 409) ||
                (type === AuthType.SignIn && status === 401)) {
              setErrorMessage(message);
              return;
            }
          }
          return err;
        })
    }
  });

  const handleChange = useCallback((event) => {
    formik.handleChange(event);
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    formik.handleSubmit();
  }

  const handleBlur = (event) => {
    const {target: {name}} = event;
    setCurrentFocused(name);
    formik.handleBlur(event);
  };

  return (
    <Wrapper>
      <Form>
        <PageTitle>{title}</PageTitle>

        <InputTitle>이메일</InputTitle>
        <Input
          type='text'
          name='email'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {formik.touched.email &&
          formik.errors.email &&
          currentFocused === 'email' ?
          <Warning>{formik.errors.email}</Warning> :
          null
        }

        {type !== AuthType.EmailReauthorization ?
          <>
            <InputTitle>비밀번호</InputTitle>
            <Input
              type='password'
              name='password'
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {formik.touched.password &&
              formik.errors.password &&
              currentFocused === 'password' ?
              <Warning>{formik.errors.password}</Warning> :
              null
            }
          </>
          : null}

        {type === AuthType.SignUp ?
          <>
            <InputTitle>비밀번호 확인</InputTitle>
            <Input
              type='password'
              name='verifyPassword'
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {formik.touched.verifyPassword &&
              formik.errors.verifyPassword &&
              currentFocused === 'verifyPassword' ?
              <Warning>{formik.errors.verifyPassword}</Warning> :
              null
            }
          </> : null
        }

        <SubmitBtn type='submit' onClick={handleClick}>{submitBtn}</SubmitBtn>

        {type !== AuthType.EmailReauthorization ?
          <>
            <LinkMessage to={LinkMessage1Path}>{LinkMessage1}</LinkMessage>
            <LinkMessage to={LinkMessage2Path}>{LinkMessage2}</LinkMessage>
          </>
          : null
        }
        {successMessage ? <Success>{successMessage}</Success> : null}
        {errorMessage ? <Warning>{errorMessage}</Warning> : null}
      </Form>
    </Wrapper>
  );
};

ValidateUserAccount.propTypes = {
  authData: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default observer(ValidateUserAccount);
