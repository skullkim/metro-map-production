import { observer } from 'mobx-react';
import styled, {css} from 'styled-components';

import indexStore from "../../stores/indexStore";
import SelectTargetButton from "../styles/SelectTargetButton";

import SelectStopoverButton from "./SelectStopoverButton";

const SelectBox = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TargetButton = styled(SelectTargetButton)`
  ${({name, target}) => name === target && css`
    background-color: #2867B28C;
  `}
`;

const SelectOperationTarget = () => {
  const {SearchTargetStore: targetStore} = indexStore();

  const handleClick = (event) => {
    const {target: {name}} = event;
    event.preventDefault();
    targetStore.selectTarget(name);
  }

  return (
    <SelectBox>
      <SelectStopoverButton />
      <TargetButton
        onClick={handleClick}
        target={targetStore.target}
        name='distance'
      >최단거리</TargetButton>
      <TargetButton
        onClick={handleClick}
        target={targetStore.target}
        name='time'
      >최소시간</TargetButton>
      <TargetButton
        onClick={handleClick}
        target={targetStore.target}
        name='cost'
      >최소비용</TargetButton>
    </SelectBox>
  );
};

export default observer(SelectOperationTarget);
