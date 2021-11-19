import { observer } from 'mobx-react';
import styled, {css} from "styled-components";

import indexStore from "../../stores/indexStore";
import SelectTargetButton from "../styles/SelectTargetButton";

const SelectStopover = styled(SelectTargetButton)`
  ${({useStopover}) => useStopover && css`
    background-color: #2867B28C;
  `}
`;

const SelectStopoverButton = () => {
  const {SearchTargetStore: targetStore} = indexStore();

  const handleChange = (event) => {
    event.preventDefault();
    targetStore.setStopoverSelected();
  }

  return (
    <SelectStopover
      onClick={handleChange}
      useStopover={targetStore.stopoverSelected}
    >
      경유지
    </SelectStopover>
  );
}

export default observer(SelectStopoverButton);