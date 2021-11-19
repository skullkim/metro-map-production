import { StationFromTo } from '../../models/stationFromTo';
import { PathTarget, StationKr } from '../type/searchPath';

export const checkEmpty = (station: string, stationName: StationKr) => {
  if (!station && station !== undefined) {
    return `${stationName}이(가) 존재하지 않습니다`;
  }
  return '';
};

export const involveChar = (station: string, stationName: StationKr) => {
  if (station === undefined) return;
  const numRegx = /^[0-9]*$/;
  if (station.length >= 5 || !station.match(numRegx)) {
    return `존재하지 않는 ${stationName} 입니다`;
  }
  return '';
};

export const checkPathTarget = (target: any) => {
  return !Object.values(PathTarget).includes(target)
    ? '길찾기 대상이 잘못되었습니다'
    : '';
};

export const isSameStation = (
  station1: string,
  station2: string,
  stationName1: StationKr,
  stationName2: StationKr
) => {
  if (station1 === undefined || station2 === undefined) return;
  return station1 == station2
    ? `${stationName1} 와 ${stationName2}가 같을 수 없습니다`
    : '';
};

export const hasStation = async (station: string, stationName: StationKr) => {
  try {
    if (station === undefined) return;
    const target = await StationFromTo.hasStation(station);
    return !target ? `존재하지 않는 ${stationName}입니다` : '';
  } catch (err) {
    throw err;
  }
};
