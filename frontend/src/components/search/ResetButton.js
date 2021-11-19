
import { observer } from 'mobx-react';

import indexStore from '../../stores/indexStore';
import {Button as ResetBtn} from "../styles/SearchPathBtn";

const ResetButton = () => {
  const {SearchTargetStore} = indexStore();

  const handleClick = (event) => {
    event.preventDefault();

    SearchTargetStore.clearSearchTarget();
  }

  return (<ResetBtn onClick={handleClick}>리셋</ResetBtn>)
}

export default observer(ResetButton);
