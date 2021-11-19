import { observer } from 'mobx-react';
import {useEffect, useState, useCallback} from 'react';
import {Redirect} from 'react-router-dom';

import { Wrapper } from '../components/styles/Authorization';
import {PageTitle, PageBox} from '../components/styles/CommonPageStyle';
import PathTable from '../components/user/PathTable';
import { getAuthenticationHeader } from '../lib/authenticateData';
import TokenApi from '../lib/customAxios';
import { ClientPath, getDeleteUserBookMarkUrl, ServerPath } from '../lib/dataPath';
import { getUserInfo } from '../lib/localStorage';
import indexStore from '../stores/indexStore';

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkDeleted, setBookmarkDeleted] = useState(false);
  const userInfo = getUserInfo();
  const {SearchTargetStore, ModalOpenStore} = indexStore();

  useEffect(() => {
    if(!userInfo) return;

    TokenApi({
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_ORIGIN}${ServerPath.GetUserBookMark}/${userInfo.userId}`,
      headers: {
        Authorization: getAuthenticationHeader(userInfo.accessToken),
      }
    })
      .then(({data: {data}}) => {
        setBookmarks(data);
      })
      .catch(err => err);
  }, [bookmarkDeleted]);

  const handleClick = useCallback(({target: {className}}, pathInfo) => {
    if(className !== 'bookmark' && pathInfo) {
      SearchTargetStore.setTargetInfo(pathInfo);
      ModalOpenStore.setSearchResultModal(true);
    }
    else {
      TokenApi({
        method: 'DELETE',
        url: getDeleteUserBookMarkUrl(pathInfo.id, userInfo.userId),
        headers: {
          Authorization: getAuthenticationHeader(userInfo.accessToken),
        },
        data: {
          pathInfo
        }
      })
        .then(() => {
          setBookmarkDeleted(!bookmarkDeleted);
        })
        .catch(err => err);
    }
  }, [bookmarkDeleted]);

  return (
    <Wrapper>
      {userInfo ?
        <PageBox>
          <PageTitle>즐겨찾기 목록</PageTitle>
          <PathTable pathLists={bookmarks} handleClick={handleClick} />
        </PageBox> :
        <Redirect to={ClientPath.SignIn} />
      }
    </Wrapper>
  );
};

export default observer(Bookmark);