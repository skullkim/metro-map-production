export const ServerPath = {
  MinPath: '/path/',
  MinPathStopover: '/path/stopover/',
  SignUp: '/authentication/signup',
  EmailVerification: '/authentication/signup/email',
  EmailReauthorization: '/authentication/signup/email/reauthorization',
  SignIn: '/authentication/signin',
  LogOut: '/authentication/logout',
  ReissuingAccessToken: '/authentication/refresh-token',
  SearchHistory: '/search-history/user',
  SearchHistoryBookmark: '/search-history/bookmark',
  GetUserBookMark: '/bookmark/user',
  DeleteUserBookMarkBaseUrl: '/bookmark',
  DeleteUserBookMarkUrl: '/user',
  GetLostAndFoundLost: '/amenities/lost-and-found',
  GetStoreBoxList: '/amenities/store-box',
  SendUserComplain: '/amenities/user-complain',

  UserBaseUrl: '/user',
  GetUserEmailUrl: '/email',
  ChangeUserInformation: '/user-information'
};
Object.freeze(ServerPath);

export const getDeleteUserBookMarkUrl = (bookmarkId, userId) => {
  return `${process.env.REACT_APP_SERVER_ORIGIN}${ServerPath.DeleteUserBookMarkBaseUrl}/${bookmarkId}${ServerPath.DeleteUserBookMarkUrl}/${userId}`;
}

export const getUserEmailUrl = (userId) => {
  return `${process.env.REACT_APP_SERVER_ORIGIN}${ServerPath.UserBaseUrl}/${userId}${ServerPath.GetUserEmailUrl}`;
}

export const getChangeUserInformationUrl = (userId) => {
  return `${process.env.REACT_APP_SERVER_ORIGIN}${ServerPath.UserBaseUrl}/${userId}${ServerPath.ChangeUserInformation}`;
}

export const ClientPath = {
  FindPath: '/',
  SignUp: '/signup',
  SignIn: '/signin',
  EmailVerification: '/signup/email',
  EmailReauthorization: '/signup/email/reauthorization',
  MyPage: '/user/',
  LogOut: '/logout',
  Bookmark: '/bookmark',
  LostAndFound: '/lost-and-found',
  StoreBox: '/store-box',
  UserComplain: '/complain',
}
Object.freeze(ClientPath);

export const ImagePath = {
  MainLogo: '/img/logo.svg',
  CloseSearchPathModal: '/img/closeSearchPathModal.svg',
};
Object.freeze(ImagePath);