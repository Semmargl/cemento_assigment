import React, { useState, useEffect, useCallback } from 'react';
import useDebounce from '../../hooks/useDebounce';

import TableHeader from './TableHeader';
import TableRow from './TableRow';
import ColumnToggles from './ColumnToggles';
import GroupByControls from './GroupByControls';
import SearchInput from './SearchInput';

import './Table.css';

const Table = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [columns, setColumns] = useState(Object.keys(initialData[0]));
  const [searchQuery, setSearchQuery] = useState('');
  const [filterColumns, setFilterColumns] = useState(Object.keys(initialData[0]));
  const [editCell, setEditCell] = useState({ row: null, col: null });
  const [groupedBy, setGroupedBy] = useState(null);
  const [collapsedGroups, setCollapsedGroups] = useState({});

  // Restore data from local storage
  useEffect(() => {
    const savedData = localStorage.getItem('tableData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  // Save data to local storage
  const handleSave = useCallback((rowIndex, col, value) => {
    const newData = [...data];
    newData[rowIndex][col] = value;
    setData(newData);
    localStorage.setItem('tableData', JSON.stringify(newData));
    setEditCell({ row: null, col: null });
  }, [data]);
  
  const debouncedSearch = useDebounce((query) => {
    setSearchQuery(query);
  }, 300);
  
  const handleSearchInput = (e) => {
    debouncedSearch(e.target.value);
  };
  
  // Toggle to hide/show columns
  const handleColumnToggle = useCallback((col) => {
    setFilterColumns((prev) => {
      if (prev.includes(col)) {
        return prev.filter((c) => c !== col);
      }
      
      let mewColumns = [...prev];
      mewColumns.splice(columns.indexOf(col), 0,  col);
      console.log(mewColumns)
      return mewColumns
    }
    );
  }, [columns]);

  
  const handleGroupBy = useCallback((col) => {
    setGroupedBy(col);
    setCollapsedGroups({});
  }, []);

  const toggleGroup = useCallback((group) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  }, []);


  // Filter data based on search query
  const filteredData = data.filter((row) =>
    columns.some((col) => row[col].toString().toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Group data based on selected column
  const groupedData = groupedBy
    ? filteredData.reduce((acc, row) => {
        const groupKey = row[groupedBy];
        if (!acc[groupKey]) acc[groupKey] = [];
        acc[groupKey].push(row);
        return acc;
      }, {})
    : { '': filteredData };


  return (
    <div>
      <SearchInput onSearch={handleSearchInput} />
      <ColumnToggles columns={columns} filterColumns={filterColumns} onToggle={handleColumnToggle} />
      <GroupByControls columns={columns} onGroupBy={handleGroupBy} />
      <table>
        <TableHeader columns={filterColumns} />
        <tbody>
          {Object.entries(groupedData).map(([group, rows]) => (
            <React.Fragment key={group}>
              {groupedBy && (
                <tr className="group-header" onClick={() => toggleGroup(group)}>
                  <td colSpan={filterColumns.length}>
                    {group} ({rows.length}) {collapsedGroups[group] ? '▼' : '▲'}
                  </td>
                </tr>
              )}
              {!collapsedGroups[group] &&
                rows.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    row={row}
                    rowIndex={rowIndex}
                    columns={filterColumns}
                    editCell={editCell}
                    onEdit={setEditCell}
                    onSave={handleSave}
                  />
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;


//TODO: Add infititive scroll to Table for large data
//TODO: Toggle to switch off Group By effect
//TODO: Add styles for group header (Name, postition, color)
//TODO: Add styles for Column Toggles (Remove Column button, Return removed Columns buttons, Restore)
//TODO: Add Memorize for table results
//TODO: Update to TypeScript