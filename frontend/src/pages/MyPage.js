import { useFormik } from 'formik';
import {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { Wrapper } from '../components/styles/Authorization';
import {PageTitle, PageBox} from '../components/styles/CommonPageStyle';
import { Warning } from '../components/styles/ResultMessage';
import { InputBox, SubmitButton } from '../components/styles/UserComplainMyPageInput';
import { getAuthenticationHeader } from '../lib/authenticateData';
import TokenApi from '../lib/customAxios';
import { ClientPath, getChangeUserInformationUrl, getUserEmailUrl } from '../lib/dataPath';
import { getUserInfo, removeUserInfo } from '../lib/localStorage';
import { maxLen, RegExp, WarningMessage } from '../lib/validateUserInfo';
import indexStore from '../stores/indexStore';

const MyPage = () => {
  const userInfo = getUserInfo();
  const {Login} = indexStore();
  const history = useHistory();
  const [userEmail, setUserEmail] = useState('');
  const [currentFocused, setCurrentFocused] = useState('');

  useEffect(() => {
    TokenApi({
      method: 'GET',
      url: `${getUserEmailUrl(userInfo.userId)}`,
      headers: {
        Authorization: getAuthenticationHeader(userInfo.accessToken)
      }
    })
      .then(({data: {data: {email}}}) => {
        setUserEmail(email);
      })
      .catch(err => err);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      previousPassword: '',
      newPassword: '',
      verifyNewPassword: '',
    },
    validationSchema: yup.object({
      email: yup.string()
        .matches(RegExp.Email, {message: `${WarningMessage.InvalidEmail}`})
        .max(maxLen, `${WarningMessage.MaxLen}`),
      previousPassword: yup.string()
        .matches(RegExp.Password, {message: `${WarningMessage.InvalidPassword}`})
        .max(maxLen, `${WarningMessage.MaxLen}`),
      newPassword: yup.string()
        .matches(RegExp.Password, {message: `${WarningMessage.InvalidPassword}`})
        .max(maxLen, `${WarningMessage.MaxLen}`),
      verifyNewPassword: yup.string()
        .matches(RegExp.Password, {message: `${WarningMessage.InvalidPassword}`})
        .max(maxLen, `${WarningMessage.MaxLen}`)
        .oneOf([yup.ref('newPassword')], `${WarningMessage.VerifyNewPasswordNotEqual}`)
    }),
    onSubmit: ({email, previousPassword, newPassword}) => {
      TokenApi({
        method: 'PUT',
        url: `${getChangeUserInformationUrl()}`,
        headers: {
          Authorization: getAuthenticationHeader(userInfo.accessToken),
        },
        data: {
          email, previousPassword, newPassword
        }
      })
        .catch(err => err)
        .finally(() => {
          removeUserInfo();
          Login.setUserId('');
          history.push(ClientPath.FindPath);
        });
    }
  });

  const handleChange = (event) => {
    formik.handleChange(event);
  }

  const handleBlur = (event) => {
    const {target: {name}} = event;
    setCurrentFocused(name);
    formik.handleBlur(event);
  }

  const handleClick = (event) => {
    event.preventDefault();
    formik.handleSubmit();
  }

  return (
    <Wrapper>
      <PageBox>
        <PageTitle>나의 정보 수정</PageTitle>
        {userEmail ?
          <>
            <InputBox
              type='text'
              name='email'
              placeholder={userEmail}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {formik.touched.email &&
              formik.errors.email &&
              currentFocused === 'email' ?
              <Warning>{formik.errors.email}</Warning> :
              null
            }
            <InputBox
              type='password'
              name='previousPassword'
              placeholder='기존 비밀번호'
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {formik.touched.previousPassword &&
              formik.errors.previousPassword &&
              currentFocused === 'previousPassword' ?
              <Warning>{formik.errors.previousPassword}</Warning> :
              null
            }
            <InputBox
              type='password'
              name='newPassword'
              placeholder='새로운 비밀번호'
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {formik.touched.newPassword &&
              formik.errors.newPassword &&
              currentFocused === 'newPassword' ?
              <Warning>{formik.errors.newPassword}</Warning> :
              null
            }
            <InputBox
              type='password'
              name='verifyNewPassword'
              placeholder='비밀번호 확인'
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {formik.touched.verifyNewPassword &&
              formik.errors.verifyNewPassword &&
              currentFocused === 'verifyNewPassword' ?
              <Warning>{formik.errors.verifyNewPassword}</Warning> :
              null
            }
            <SubmitButton type='submit' onClick={handleClick}>
              나의 정보 수정하기
            </SubmitButton>
          </> : null
        }
      </PageBox>
    </Wrapper>
  );
}

export default MyPage;