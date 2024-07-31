import React, { useRef } from 'react';
import EditCell from '../EditCell';

const TableRow = ({ row, rowIndex, columns, editCell, onEdit, onSave, style }) => {
  const editRef = useRef(null);

  //Handles the edit event for a specific column in a table row.
  const handleEdit = (col) => {
    onEdit({ row: rowIndex, col });
    setTimeout(() => {
      if (editRef.current) {
        editRef.current.focus();
      }
    }, 0);
  };

  return (
    <tr style={style}>
      {columns.map((col) => (
        <td key={col} onClick={() => handleEdit(col)}>
          {editCell.row === rowIndex && editCell.col === col ? (
            <EditCell
              ref={editRef}
              value={row[col]}
              onBlur={(value) => onSave(rowIndex, col, value)}
            />
          ) : (
            `${row[col]}`
          )}
        </td>
      ))}
    </tr>
  );
};

export default React.memo(TableRow);