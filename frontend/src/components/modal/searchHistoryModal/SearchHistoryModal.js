import { observer } from 'mobx-react';
import {useEffect, useState, useCallback} from 'react';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';

import TokenApi from '../../../lib/customAxios';
import { ClientPath, ServerPath } from '../../../lib/dataPath';
import { getUserInfo } from '../../../lib/localStorage';
import indexStore from '../../../stores/indexStore';
import {PageTitle} from '../../styles/CommonPageStyle';
import PathTable from '../../user/PathTable';
import { ModalBox, CommonModalBox } from '../CommonModal';
import ModalCloseButton from '../ModalCloseButton';

const ModalTitleBox = styled.section`
  display: flex;
  flex-direction: column;
  align-self: center;
  position: relative;
  top: 20px;
  
  ${PageTitle} {
    align-self: center;
  }
`;

const CloseButton = styled.section`
  position: relative;
  top: 50px;
`;

const SearchHistoryModal = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [updateBookMark, setUpdateBookMark] = useState(false);
  const userInfo = getUserInfo();
  const {SearchTargetStore, ModalOpenStore} = indexStore();

  useEffect(() => {
    if(!userInfo) {
      ModalOpenStore.setSearchHistoryModal(false);
      return;
    }

    TokenApi({
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_ORIGIN}${ServerPath.SearchHistory}/${userInfo.userId}`,
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      }
    })
      .then(({data: {data: {search_history: userSearchHistory}}}) => {
        setSearchHistory(userSearchHistory);
      })
      .catch(err => err);
  }, [updateBookMark]);

  const handleClick = useCallback(({target: {className}}, pathInfo) => {
    if(className !== 'bookmark' && pathInfo) {
      SearchTargetStore.setTargetInfo(pathInfo);
      ModalOpenStore.setSearchHistoryModal(false);
      ModalOpenStore.setSearchResultModal(true);
    }
    else {
      TokenApi({
        method: 'PUT',
        url: `${process.env.REACT_APP_SERVER_ORIGIN}${ServerPath.SearchHistoryBookmark}/${pathInfo.id}`,
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
        data: {
          pathInfo,
        }
      })
        .then(() => setUpdateBookMark(!updateBookMark))
        .catch(err => err);
    }
  }, [updateBookMark])

  return (
    <>
      {userInfo ?
        <CommonModalBox>
          <ModalBox>
            <ModalTitleBox>
              <PageTitle>최근 검색 내역</PageTitle>
            </ModalTitleBox>
            <PathTable pathLists={searchHistory} handleClick={handleClick} />
            <CloseButton>
              <ModalCloseButton />
            </CloseButton>
          </ModalBox>
        </CommonModalBox>
        :
        <Redirect to={ClientPath.SignIn}/>
      }
    </>
  );
}

export default observer(SearchHistoryModal);