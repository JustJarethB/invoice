import React from 'react';
import Invoice from 'components/Invoice';
import InvoiceControls from 'components/InvoiceControls';

import Database from 'Database';

class App extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      from: Database.getDefaultAddress(),
      to: {}
    }
  }

  loadClientAddress(index) {
    this.setState({ to: Database.getAllClients()[index].address })
  }

  render() {
    const {
      from,
      to
    } = this.state;
    return (
      <div className="App bg-gray-50">
        <InvoiceControls loadClientAddress={v => this.loadClientAddress(v)} />
        <Invoice {...{ from, to }} onChange={v => this.setState(v)} />
      </div>
    );
  }
}

export default App;
