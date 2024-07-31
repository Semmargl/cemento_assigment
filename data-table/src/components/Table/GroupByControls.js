import React from 'react';

const GroupByControls = ({ columns, onGroupBy }) => (
  <div className="group-by">
    Group by:
    {columns.map((col) => (
      <button key={col} onClick={() => onGroupBy(col)}>
        {col}
      </button>
    ))}
  </div>
);

export default React.memo(GroupByControls);