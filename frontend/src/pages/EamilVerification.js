import qs from 'qs';
import {useEffect, useState} from 'react';
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

import { Success, Warning } from "../components/styles/ResultMessage";
import { Api } from "../lib/customAxios";
import { ClientPath, ServerPath } from "../lib/dataPath";

const Wrapper = styled.section`
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RedirectButton = styled(NavLink)`
  width: 19em;
  height: 3em;
  color: white;
  background-color: #2867b2;
  font-weight: bold;
  font-size: 1em;
  border: 1px solid #2867b2;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmailVerification = () => {
  const {id, key} = qs.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    Api({
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_ORIGIN}${ServerPath.EmailVerification}`,
      params: {id, key}
    })
      .then(({data: {data: {message}}}) => {
        setSuccessMessage(message);
      })
      .catch((err) => {
        const {response: {status, data: {error: {message}}}} = err;
        if(status === 403) {
          setErrorMessage(message);
          return;
        }
        return err;
      });
  }, []);

  return (
    <>
      {successMessage ?
        <Wrapper>
          <Success>{successMessage}</Success>
          <RedirectButton to={ClientPath.SignIn}>로그인 하기</RedirectButton>
        </Wrapper> :
        null
      }
      {errorMessage ?
        <Wrapper>
          <Warning>{errorMessage}</Warning>
          <RedirectButton to={ClientPath.EmailReauthorization}>인증메일 다시 보내기</RedirectButton>
        </Wrapper> :
        null
      }
    </>
  );
}

export default EmailVerification;