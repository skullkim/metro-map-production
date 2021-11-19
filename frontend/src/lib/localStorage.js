export const getUserInfo = () => JSON.parse(
  localStorage.getItem(`${process.env.REACT_APP_USER_INFO}`)
);

export const setUserInfo = (userId, accessToken) => {
  localStorage.setItem(`${process.env.REACT_APP_USER_INFO}`, JSON.stringify({
    userId, accessToken
  }));
}

export const removeUserInfo = () => {
  localStorage.removeItem(`${process.env.REACT_APP_USER_INFO}`);
}