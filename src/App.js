import React from 'react';
import Invoice from 'components/Invoice';
import InvoiceControls from 'components/InvoiceControls';

function App() {
  return (
    <div className="App bg-gray-50">
      <InvoiceControls />
      <Invoice />
    </div>
  );
}

export default App;
