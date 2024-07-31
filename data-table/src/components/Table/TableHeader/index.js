import React from 'react';

const TableHeader = ({ columns }) => (
  <thead>
    <tr>
      {columns.map((col) => (
        <th key={col}>{col}</th>
      ))}
    </tr>
  </thead>
);

export default React.memo(TableHeader);