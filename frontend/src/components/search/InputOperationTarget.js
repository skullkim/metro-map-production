import { observer } from 'mobx-react';
import styled from 'styled-components';

import {StationCategory} from "../../lib/subwayData";
import indexStore from "../../stores/indexStore";

const InputBox = styled.div`
  flex: 2;
  display: flex;
`;

const InputLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 25px;
  font-size: 18px;
  font-weight: bold;
`;

const InputStation = styled.input`
  height: 40px;
  width: 60px;
  margin-left: 5px;
  padding: 0;
  border: 1px solid #2867b226;
  border-radius: 10px;
  background-color: #2867b226;
`;

const InputOperationTarget = () => {
  const {SearchTargetStore: targetStore} = indexStore();

  const handleChange = ({target: {name, value}}) => {
    switch (name) {
      case StationCategory.StartStation:
        targetStore.setStartStation(value);
        break;
      case StationCategory.StopoverStation:
        targetStore.setStopoverStation(value);
        break;
      case StationCategory.ArriveStation:
        targetStore.setArriveState(value);
        break;
      default:
        throw new Error(`invalid target ${name}`)
    }
  }

  return (
    <InputBox>
      <InputLabel>
        출발
        <InputStation
          type='text'
          name={StationCategory.StartStation}
          maxLength='3'
          value={targetStore.startStation}
          onChange={handleChange}
        />
      </InputLabel>
      {targetStore.stopoverSelected &&
        <InputLabel>
          경유지
          <InputStation
            type='text'
            name={StationCategory.StopoverStation}
            maxLength='3'
            value={targetStore.stopoverStation}
            onChange={handleChange}
          />
        </InputLabel>
      }
      <InputLabel>
        도착
        <InputStation
          type='text'
          name={StationCategory.ArriveStation}
          maxLength='3'
          value={targetStore.arriveStation}
          onChange={handleChange}
        />
      </InputLabel>
    </InputBox>
  );
};

export default observer(InputOperationTarget);
