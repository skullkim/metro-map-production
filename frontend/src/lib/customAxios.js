import axios from 'axios';

import { ServerPath } from './dataPath';
import { getUserInfo, removeUserInfo, setUserInfo } from './localStorage';

export const Api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_ORIGIN}`,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const TokenApi = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_ORIGIN}`,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

TokenApi.interceptors.request.use(
  config => config,
  err => {
    return Promise.reject(err);
  }
);

TokenApi.interceptors.response.use(
  res => res,
  async (err) => {
    const originalRequest = err.config;

    // eslint-disable-next-line no-underscore-dangle
    if(err.response.status === 403 && !originalRequest._retry) {
      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;

      const {userId} = getUserInfo();

      return Api({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_ORIGIN}${ServerPath.ReissuingAccessToken}`,
      })
        .then(({data: {data: {accessToken}}}) => {
          removeUserInfo();
          setUserInfo(userId, accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        })
    }

    return Promise.reject(err);
  }
)

export default TokenApi;