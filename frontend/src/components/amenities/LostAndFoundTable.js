import {useEffect, useState} from 'react';
import styled from 'styled-components';

import { Api } from '../../lib/customAxios';
import { ServerPath } from '../../lib/dataPath';
import { ListTable, ListTitle, TableData, TableRow } from '../styles/Table';

const LostAndFoundListTable = styled(ListTable)`
  height: 450px;
  width: 400px;
`;

const LostAndFoundTable = () => {
  const [lostAndFoundList, setLostAndFoundList] = useState([]);

  useEffect(() => {
    Api({
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_ORIGIN}${ServerPath.GetLostAndFoundLost}`,
    })
      .then(({data: {data}}) => {
        setLostAndFoundList(data);
      })
      .catch(err => err);
  }, []);

  return (
    <LostAndFoundListTable>
      <thead>
        <tr>
          <ListTitle>역</ListTitle>
          <ListTitle>전화번호</ListTitle>
          <ListTitle>운영시간</ListTitle>
        </tr>
      </thead>
      <tbody>
        {lostAndFoundList.length ?
          lostAndFoundList.map(({id, station, callNumber, operatingHour}) => (
            <TableRow key={id}>
              <TableData>{station}</TableData>
              <TableData>{callNumber}</TableData>
              <TableData>{operatingHour}</TableData>
            </TableRow>
          )) : null
        }
        
      </tbody>
    </LostAndFoundListTable>
  );
}

export default LostAndFoundTable;