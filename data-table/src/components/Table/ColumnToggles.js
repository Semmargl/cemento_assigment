import React from 'react';

const ColumnToggles = ({ columns, filterColumns, onToggle }) => (
  <div className="column-toggles">
    {columns.map((col) => (
      <label key={col}>
        <input
          type="checkbox"
          checked={filterColumns.includes(col)}
          onChange={() => onToggle(col)}
        />
        {col}
      </label>
    ))}
  </div>
);

export default React.memo(ColumnToggles);