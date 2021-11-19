import PropTypes from 'prop-types';

import { SearchStationOption } from '../../lib/subwayData';
import { ListTable, ListTitle, TableData, TableRow } from '../styles/Table';

const PathTable = ({pathLists, handleClick}) => {
  return (
    <ListTable>
      <thead>
        <tr>
          <ListTitle>최소비용</ListTitle>
          <ListTitle>출발역 / 도착역</ListTitle>
          <ListTitle>경유지</ListTitle>
          <ListTitle>즐겨찾기</ListTitle>
        </tr>
      </thead>
      <tbody>
        {pathLists.length ? pathLists.map(({id, from, to, stopover, target, bookmark}) => {
          const bookmarkLogoUrl = `/img/${bookmark ? 'bookmark.svg' : 'unbookmark.svg'}`;
          const pathInfo = {id, from, to, stopover, target};
          return (
            <TableRow key={id} onClick={(event) => handleClick(event, pathInfo)}>
              <TableData>
                {SearchStationOption[target]}
              </TableData>
              <TableData>
                {from}--&gt;{to}
              </TableData>
              <TableData>
                {stopover || 'X'}
              </TableData>
              <TableData className='bookmark'>
                <img src={bookmarkLogoUrl} alt='bookmark' className='bookmark' />
              </TableData>
            </TableRow>
          );
        }) : null}
      </tbody>
    </ListTable>
  );
}

PathTable.propTypes = {
  pathLists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    stopover: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    bookmark: PropTypes.bool,
  })).isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default PathTable;