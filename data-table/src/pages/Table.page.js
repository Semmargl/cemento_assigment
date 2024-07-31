import React from 'react';
import Table from '../components/Table/Table';

const initialData = [
  { id: 1, name: 'John Doe', age: 28, isActive: true, gender: 'Male' },
  { id: 2, name: 'Jane Doe', age: 32, isActive: false, gender: 'Female' },
  // Add more initial data as needed
];

const TablePage = () => {
  return (
    <div className="App">
      <Table initialData={initialData} />
    </div>
  );
};

export default TablePage;

//TODO: Suggestion to add AG-Grid as main Table component