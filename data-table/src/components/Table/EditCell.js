import React, { forwardRef } from 'react';

const EditCell = forwardRef(({ value, onBlur }, ref) => {
  const handleBlur = (e) => {
    onBlur(e.target.value);
  };

  return (
    <input
      type="text"
      defaultValue={value}
      ref={ref}
      onBlur={handleBlur}
    />
  );
});

export default React.memo(EditCell);