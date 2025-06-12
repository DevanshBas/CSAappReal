import React, { useState } from 'react';

const BillSelector = ({ onSelectBill }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // In a real implementation, you would likely filter a list of bills here
    // and display them for selection.
  };

  // Placeholder function for selecting a bill
  const handleSelectBill = (billId) => {
    console.log('Selected bill ID:', billId);
    if (onSelectBill) {
      // Call the parent component's handler with the selected bill ID
      onSelectBill(billId);
    }
  };

  return (
    <div className="bill-selector">
      <h2>Select a Bill to Remix</h2>
      <input
        type="text"
        placeholder="Search for a bill..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="border p-2 rounded"
      />
      {/* Placeholder for displaying search results or a dropdown */}
      <div className="mt-2">
        {/* Example: hardcoded placeholder bills */}
        <button onClick={() => handleSelectBill('bill-1')} className="mr-2 p-1 border rounded">
          Sample Bill 1
        </button>
        <button onClick={() => handleSelectBill('bill-2')} className="p-1 border rounded">
          Sample Bill 2
        </button>
      </div>
    </div>
  );
};

export default BillSelector;