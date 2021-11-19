import {observable} from "mobx";

const ModalOpenStore = observable({
  searchResultModal: false,
  searchHistoryModal: false,
  searchPathModal: false,

  setSearchResultModal(searchResultModal) {
    this.searchResultModal = searchResultModal;
  },

  setSearchHistoryModal(searchHistoryModal) {
    this.searchHistoryModal = searchHistoryModal;
  },

  setSearchPathModal(searchPathModal) {
    this.searchPathModal = searchPathModal;
  }
});

export default ModalOpenStore;