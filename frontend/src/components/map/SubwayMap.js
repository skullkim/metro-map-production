import { observer } from 'mobx-react';
import {useState, useRef} from 'react';
import { Graph } from 'react-d3-graph';
import styled from 'styled-components';

import subwayData, { subwayConfig } from '../../lib/subwayData';
import indexStore from '../../stores/indexStore';
import SearchPathModal from '../modal/searchPathModal/SearchPathModal';

const Wrapper = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MapContainer = styled.div`
  width: 1020px;
  height: 800px;
  overflow-x: scroll;
  overflow-y: scroll;
  margin-top: ${props => props.mapMarginTop};
  margin-left: ${props => props.mapMarginLeft};
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
`;

const SubwayMap = () => {
  const {ModalOpenStore} = indexStore();
  const subwayMapRef = useRef();
  const [searchPathModalPosition, setSearchPathModalPosition] = useState({
    xPosition: 0, yPosition: 0, stationName: ''
  });

  const handleNodeClick = (stationName) => {
    setSearchPathModalPosition({...searchPathModalPosition, stationName});
  }

  const handleClick = (event) => {
    const {x: xPosition, y: yPosition} = event.target.getBoundingClientRect();

    ModalOpenStore.setSearchPathModal(true);

    setSearchPathModalPosition({
      ...searchPathModalPosition, xPosition, yPosition
    });
  }

  const closeModal = () => {
    ModalOpenStore.setSearchPathModal(false);
  }

  return (
    <Wrapper>
      <MapContainer
        ref={subwayMapRef}
        argin-top='3%'
        margin-left='10.5%'
        onClick={handleClick}
      >
        <Graph
          id='graph-id'
          ref={subwayMapRef}
          data={subwayData}
          config={subwayConfig}
          onClickNode={handleNodeClick}
        />
      </MapContainer>
      {ModalOpenStore.searchPathModal &&
        searchPathModalPosition.xPosition &&
        searchPathModalPosition.yPosition?
        <SearchPathModal
          xPosition={searchPathModalPosition.xPosition}
          yPosition={searchPathModalPosition.yPosition}
          stationName={searchPathModalPosition.stationName}
          closeModal={closeModal}
        /> :
        null
      }
    </Wrapper>
  );
};

export default observer(SubwayMap);

