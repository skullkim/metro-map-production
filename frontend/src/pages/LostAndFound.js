
import LostAndFoundTable from '../components/amenities/LostAndFoundTable';
import { Wrapper } from '../components/styles/Authorization';
import { PageTitle, PageBox } from '../components/styles/CommonPageStyle';


const LostAndFound = () => {
  return (
    <Wrapper>
      <PageBox>
        <PageTitle>유실물센터 목록</PageTitle>
        <LostAndFoundTable />
      </PageBox>
    </Wrapper>
  );
}

export default LostAndFound;