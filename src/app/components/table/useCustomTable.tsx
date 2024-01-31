import { useMemo, useState } from 'react';
import { useTable, Column, Row, TableState, TableOptions } from 'react-table';

// Define the structure of your data items
interface DataItem {
  // Example data item properties
  id: number;
  name: string;
  // Add other properties as needed
}

// Extend the TableOptions type with your DataItem type
interface TableOptionsWithData extends TableOptions<DataItem> {
  columns: Column<DataItem>[];
  data: DataItem[];
}

function useCustomTable(data: DataItem[]): {
  getTableProps: () => any;
  getTableBodyProps: () => any;
  headerGroups: any[];
  rows: Row<DataItem>[];
  prepareRow: (row: Row<DataItem>) => void;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setSortBy: React.Dispatch<React.SetStateAction<any[]>>;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
} {
  const [filter, setFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<any[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const columns: Column<DataItem>[] = useMemo(() => [
    // Define your columns here
    // Example column definition
    {
      Header: 'Name',
      accessor: 'name', // accessor is the "key" in the data
    },
    // Add other columns as needed
  ], []);

  const tableInstance = useTable<DataItem>({
    columns,
    data,
    initialState: { pageIndex, pageSize, sortBy } as Partial<TableState<DataItem>>,
  } as TableOptionsWithData);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  // Implement any custom logic for filtering, sorting, and pagination here

  return {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
    setSortBy,
    setPageIndex,
    setPageSize,
  };
}


<thead>
  {headerGroups.map(headerGroup => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map(column => (
        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
          {column.render('Header')}
          {/* Add a sort direction indicator */}
          <span>
            {column.isSorted
              ? column.isSortedDesc
                ? ' 🔽'
                : ' 🔼'
              : ''}
          </span>
        </th>
      ))}
    </tr>
  ))}
</thead>

<tbody {...getTableBodyProps()}>
  {rows.map(row => {
    prepareRow(row);
    return (
      <tr {...row.getRowProps()}>
        {row.cells.map(cell => (
          <td {...cell.getCellProps()}>
            {cell.render('Cell')}
          </td>
        ))}
      </tr>
    );
  })}
</tbody>