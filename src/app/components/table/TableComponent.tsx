import React from 'react';
import { useCustomTable } from './path-to-your-useCustomTable-hook'; // Adjust the import path as necessary

// Assuming DataItem is your data type, import it if it's defined in another file
interface DataItem {
  // Define the structure of your data items here
  id: number;
  name: string;
  // Add other properties as needed
}

interface TableComponentProps {
  data: DataItem[];
}

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useCustomTable(data);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={rowIndex}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} key={cell.column.id}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableComponent;