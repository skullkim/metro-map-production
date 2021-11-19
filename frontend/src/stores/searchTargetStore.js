import {observable} from "mobx";

const SearchTargetStore = observable({
  target: '',
  startStation: '',
  arriveStation: '',
  stopoverStation: '',
  stopoverSelected: false,
  errorMessage: '',

  setTargetInfo(pathInfo) {
    this.target = pathInfo.target;
    this.startStation = pathInfo.from;
    this.arriveStation = pathInfo.to;
    this.stopoverStation = pathInfo.stopover;
    this.stopoverSelected = !!pathInfo.stopover;
  },

  selectTarget(target) {
    this.target = target;
  },

  setStartStation(startStation) {
    this.startStation = startStation;
  },

  setArriveState(arriveStation) {
    this.arriveStation = arriveStation;
  },

  setStopoverStation(stopoverStation) {
    this.stopoverStation = stopoverStation;
  },

  setStopoverSelected() {
    this.stopoverSelected = !this.stopoverSelected;
  },

  setErrorMessage(errorMessage) {
    this.errorMessage = errorMessage;
  },

  clearSearchTarget() {
    this.target = '';
    this.startStation = '';
    this.stopoverStation = '';
    this.arriveStation = '';
    this.stopoverSelected = '';
    this.errorMessage = '';
  }

});

export default SearchTargetStore;