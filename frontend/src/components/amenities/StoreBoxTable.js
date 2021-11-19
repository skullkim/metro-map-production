import {useEffect, useState} from 'react';

import { Api } from '../../lib/customAxios';
import { ServerPath } from '../../lib/dataPath';
import { ListTable, ListTitle, TableData, TableRow } from '../styles/Table';


const StoreBoxTable = () => {
  const [storeBoxList, setStoreBoxList] = useState([]);

  useEffect(() => {
    Api({
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_ORIGIN}${ServerPath.GetStoreBoxList}`,
    })
      .then(({data: {data}}) => {
        setStoreBoxList(data);
      })
      .catch(err => err);
  }, []);

  return (
    <ListTable>
      <thead>
        <tr>
          <ListTitle>역</ListTitle>
        </tr>
      </thead>
      <tbody>
        {storeBoxList.length ? (
          storeBoxList.map(({id, station}) => (
            <TableRow key={id}>
              <TableData>{station}</TableData>
            </TableRow>
          ))
        ) : null}
      </tbody>
    </ListTable>
  )
}

export default StoreBoxTable;