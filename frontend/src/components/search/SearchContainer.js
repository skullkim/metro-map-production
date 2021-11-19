import {observer} from "mobx-react";
import styled from 'styled-components';

import indexStore from "../../stores/indexStore";
import {Warning} from "../styles/ResultMessage";

import InputOperationTarget from './InputOperationTarget';
import SelectOperationTarget from './SelectOperationTarget';
import SubmitButton from './SubmitButton';

const OptionsBox = styled.section`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  position: sticky;
`;


const SearchContainer = () => {
  const {SearchTargetStore: targetStore} = indexStore();

  return (
    <OptionsBox>
      <SelectOperationTarget />
      <InputOperationTarget />
      {targetStore.errorMessage ?
        <Warning>{targetStore.errorMessage}</Warning> :
        null
      }
      <SubmitButton />
    </OptionsBox>
  );
};

export default observer(SearchContainer);

