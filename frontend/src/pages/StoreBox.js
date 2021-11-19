import styled from 'styled-components';

import StoreBoxTable from '../components/amenities/StoreBoxTable';
import { Wrapper } from '../components/styles/Authorization';
import {PageTitle, PageBox} from '../components/styles/CommonPageStyle';

const StoreBoxBox = styled(PageBox)`
  position: relative;
  top: -100px;
`;

const StoreBox = () => {
  return (
    <Wrapper>
      <StoreBoxBox>
        <PageTitle>물품보관함 위치</PageTitle>
        <StoreBoxTable />
      </StoreBoxBox>
    </Wrapper>
  );
}

export default StoreBox;