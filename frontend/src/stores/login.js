import {observable} from 'mobx';

import { getUserInfo } from '../lib/localStorage';

const userInfo = getUserInfo();

const Login = observable({
  userId: userInfo ? userInfo.userId : '',

  setUserId(userId) {
    this.userId = userId;
  }
});

export default Login;