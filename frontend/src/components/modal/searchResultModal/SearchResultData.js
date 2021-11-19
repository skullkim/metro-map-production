import {useEffect, useState} from 'react';
import { Graph } from "react-d3-graph";
import styled, { css } from "styled-components";

import { getAuthenticationHeader } from '../../../lib/authenticateData';
import TokenApi from '../../../lib/customAxios';
import { getUserInfo } from '../../../lib/localStorage';
import { makePathData, makeSubwayPathGraph, makeReqQuery, makeReqUrl } from "../../../lib/makeRequest";
import { subwayResultConfig } from "../../../lib/subwayData";
import indexStore from "../../../stores/indexStore";
import { DataTitle } from '../CommonModal';

const ResultBox = styled.section`
  height: 256px;
  width: 463px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ResultDataBox = styled.section`
  width: 463px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DataBox = styled.div`
  display: flex;
  flex-direction: column;
  ${({first}) => first && css`
    margin-right: 20px;
  `};
`;


const Data = styled(DataTitle)``;

const GraphBox = styled.div``;

const SearchResultData = () => {
  const {SearchTargetStore: targetStore} = indexStore();
  const [searchResult, setSearchResult] = useState([]);
  const [searchedPath, setSearchedPath] = useState({});

  useEffect(() => {
    const url = makeReqUrl(targetStore);
    const data = makeReqQuery(targetStore);
    const {accessToken} = getUserInfo() ?? '';

    TokenApi({
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_ORIGIN}${url}`,
      headers: {
        Authorization: `${accessToken ? getAuthenticationHeader(accessToken) : ''}`,
      },
      params: data,
    })
      .then(({data: {data: resultData}}) => {
        setSearchResult(makePathData(targetStore, resultData));
        setSearchedPath(makeSubwayPathGraph(resultData.path));
      })
      .catch(err => err);
  }, []);

  return (
    <ResultBox>
      <ResultDataBox>
        {searchResult.length && searchResult.map(({title, data, first}) => (
          <DataBox first={first} key={title}>
            <DataTitle>{title}</DataTitle>
            <Data>{data}</Data>
          </DataBox>
        ))}
      </ResultDataBox>
      <GraphBox>
        {searchedPath !== {} && searchedPath.nodes && searchedPath.links &&
          <Graph id='graph-id' data={searchedPath} config={subwayResultConfig} />
        }
      </GraphBox>
    </ResultBox>

  );
}

export default SearchResultData;