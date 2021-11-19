import { ServerPath } from "./dataPath";
import subwayData from "./subwayData";

export const makePathData = (
  {
    stopoverSelected, 
    startStation, 
    stopoverStation, 
    arriveStation
  }, { cost, distance, time }
) => {
  
  return [
    {
      title: stopoverSelected ? '출발역/경유지/도착역' : '출발역/도착역',
      data: stopoverSelected ?
        `${startStation} -> ${stopoverStation} -> ${arriveStation}` :
        `${startStation} -> ${arriveStation}`,
      first: true,
    },
    {
      title: '요금 정보',
      data: cost,
      first: false,
    },
    {
      title: '거리 정보',
      data: distance,
      first: false,
    },
    {
      title: '소요 시간',
      data: time,
      first: false,
    }
  ]
}


export const makeSubwayPathGraph = (path) => {
  const result = {
    nodes: [],
    links: [],
  };

  path.forEach(({station}) => {
    const tmp = subwayData.nodes.filter(({name}) => name === station)[0];
    result.nodes = result.nodes.concat({
      ...tmp, x: tmp.x / 5.5 + 30, y: tmp.y / 5.5 + 30
    });
  });

  for(let i = 1; i < path.length; i += 1) {
    result.links = result.links.concat(
      subwayData.links.find(({source, target}) => {
        return (path[i - 1].station === source && path[i].station === target);
      })
    );
  }

  return result;
}

export const makeReqUrl = ({stopoverSelected, target}) => {
  return stopoverSelected ?
    `${ServerPath.MinPathStopover}${target}` :
    `${ServerPath.MinPath}${target}`;
}

export const makeReqQuery = ({
  stopoverSelected,
  startStation,
  stopoverStation,
  arriveStation
}) => {
  return stopoverSelected ? {
    startStation,
    stopoverStation,
    arriveStation,
  } : {
    startStation,
    arriveStation,
  };

}
