import styled from 'styled-components';

import {PageTitle} from '../../styles/CommonPageStyle';
import { ModalBox, CommonModalBox } from '../CommonModal';
import ModalCloseButton from "../ModalCloseButton";

import SearchResultData from "./SearchResultData";

const SearchResultModalBox = styled(ModalBox)`
  justify-content: space-evenly;
`;

const SearchResultModal = () => {
  return (
    <CommonModalBox>
      <SearchResultModalBox>
        <PageTitle>검색 결과</PageTitle>
        <SearchResultData />
        <ModalCloseButton />
      </SearchResultModalBox>
    </CommonModalBox>
  );
}

export default SearchResultModal;