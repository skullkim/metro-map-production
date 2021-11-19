import { observer } from 'mobx-react';

import validateTarget from "../../lib/validateStation";
import indexStore from "../../stores/indexStore";
import {Button as SearchBtn} from "../styles/SearchPathBtn";

const SearchButton = () => {
  const {ModalOpenStore: openModal, SearchTargetStore: targetStore} = indexStore();

  const handleClick = (event) => {
    event.preventDefault();
    targetStore.setErrorMessage(validateTarget(targetStore));
    if(targetStore.errorMessage) {
      return;
    }
    openModal.setSearchResultModal(true);

  }

  return (
    <SearchBtn onClick={handleClick}>검색</SearchBtn>
  );
}

export default observer(SearchButton);
