import styled from 'styled-components';

export const ListTitle = styled.th`
  align-self: center;
  font-size: 20px;
  font-weight: bold;
`;

export const ListTable = styled.table`
  height: 300px;
  width: 400px;
  position: relative;
  top: 30px;
`;


export const TableData = styled.td`
  height: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 20px
`;

export const TableRow = styled.tr`
  height: 10px;
  
  &:hover {
    cursor: grab;
  }
`;