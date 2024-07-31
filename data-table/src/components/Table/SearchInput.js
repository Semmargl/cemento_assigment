import React from 'react';

const SearchInput = ({ onSearch }) => (
  <input
    type="text"
    placeholder="Search..."
    onChange={onSearch}
  />
);

export default React.memo(SearchInput); 