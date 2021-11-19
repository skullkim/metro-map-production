const StationKr = {
  StartStation: '출발점',
  StopoverStation: '경유지',
  ArriveStation: '도착지',
}
Object.freeze(StationKr);

const PathTarget = {
  Time: 'time',
  Distance: 'distance',
  Cost: 'cost',
};
Object.freeze(PathTarget);

const checkEmpty = (station, stationName) => {
  if (!station) {
    return `${stationName}이(가) 존재하지 않습니다`;
  }
  return '';
};

const involveChar = (station, stationName) => {
  const numRegx = /^[0-9]*$/;
  if (station.length >= 5 || !station.match(numRegx)) {
    return `존재하지 않는 ${stationName} 입니다`;
  }
  return '';

};

const checkPathTarget = (target) => {
  return !Object.values(PathTarget).includes(target)
    ? '길찾기 대상이 잘못되었습니다'
    : '';
};

const isSameStation = (
  station1,
  station2,
  stationName1,
  stationName2
) => {
  return station1 === station2 && station1 && station2
    ? `${stationName1} 와 ${stationName2}가 같을 수 없습니다`
    : '';
};


const validateTarget = ({
  target,
  startStation,
  arriveStation,
  stopoverStation,
  stopoverSelected
}) => {
  const existPathTarget = checkPathTarget(target);

  const emptyStation =
    checkEmpty(startStation, StationKr.StartStation) ||
    checkEmpty(arriveStation, StationKr.ArriveStation) ||
    (stopoverSelected ?
      checkEmpty(stopoverStation, StationKr.StopoverStation) :
      ''
    );

  const sameStation =
    isSameStation(
      startStation,
      arriveStation,
      StationKr.StartStation,
      StationKr.ArriveStation
    ) || (
      stopoverSelected ?
        isSameStation(
          startStation,
          stopoverStation,
          StationKr.StartStation,
          StationKr.StopoverStation,
        ) : ''
    ) || (
      stopoverSelected ? 
        isSameStation(
          stopoverStation,
          arriveStation,
          StationKr.StopoverStation,
          StationKr.ArriveStation,
        ) : ''
    );

  const incorrectStationName =
    involveChar(startStation, StationKr.StartStation) ||
    involveChar(arriveStation, StationKr.ArriveStation) ||
    (stopoverSelected ? involveChar(stopoverStation, StationKr.StopoverStation) : '');

  return (existPathTarget ||
    emptyStation ||
    sameStation ||
    incorrectStationName);
}

export default validateTarget;