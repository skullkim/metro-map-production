import {observer} from 'mobx-react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { getAuthenticationHeader } from '../../lib/authenticateData';
import TokenApi from '../../lib/customAxios';
import { ServerPath } from '../../lib/dataPath';
import { getUserInfo, removeUserInfo } from '../../lib/localStorage';
import indexStore from '../../stores/indexStore';

const LogoutBtn = styled.button`
  margin-top: 0;
  margin-right: 25px;
  font-size: 18px;
  font-weight: bold;
  word-break: keep-all;
  padding: 0;
  border: 0;
  
  &:hover {
    cursor: grab;
  }
`;

const Logout = () => {
  const {Login} = indexStore();
  const history = useHistory();

  const handleClick = (event) => {
    event.preventDefault();
    const {accessToken} = getUserInfo();

    TokenApi({
      method: 'POST',
      url: `${process.env.REACT_APP_SERVER_ORIGIN}${ServerPath.LogOut}`,
      headers: {
        Authorization: getAuthenticationHeader(accessToken),
      }
    })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        removeUserInfo();
        Login.setUserId('');
        history.push('/');
      })
  }

  return (
    <LogoutBtn
      type='submit'
      onClick={handleClick}
    >
      로그아웃
    </LogoutBtn>
  )
}

export default observer(Logout);