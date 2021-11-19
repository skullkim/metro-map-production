import { observer } from 'mobx-react';

import SubwayMap from '../components/map/SubwayMap';
import SearchContainer from '../components/search/SearchContainer';

const FindPathPage = () => {

  return (
    <>
      <SearchContainer />
      <SubwayMap />
    </>
  );
};

export default observer(FindPathPage);
