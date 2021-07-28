import React from 'react';
import Invoice from 'components/Invoice';
import InvoiceControls from 'components/InvoiceControls';

import Database from 'Database';
import { newLine } from 'utils'


class App extends React.PureComponent {
  constructor() {
    super()
    const now = new Date();
    this.state = {
      from: Database.getDefaultAddress(),
      to: {},
      id: `${now.getTime()}`.substring(0, 10),
      date: now.toLocaleDateString(),
      logo: { url: "//cdn.logo.com/hotlink-ok/enterprise/eid_422203f0-477b-492b-9847-689feab1452a/logo-dark-2020.png" },
      lineItems: [newLine()],
      purchaseOrder: '---',
      emailAddress: 'JustJarethB@gmail.com',
      phoneNumber: '(+44)7 414 464 648',
      payment: {
        terms: 'NET 30',
        method: {
          type: 'BACS',
          bankName: `Nationwide Building Society`,
          sortCode: '07-04-36',
          number: '15746644',
        }
      }
    }

  }


  loadClientAddress(index) {
    this.setState({ to: Database.getAllClients()[index].address })
  }

  render() {
    const {
      id,
      date,
      logo,
      payment,
      lineItems,
      emailAddress,
      phoneNumber,
      purchaseOrder = 0,
      from,
      to,
    } = this.state;
    return (
      <div className="App bg-gray-50">
        <InvoiceControls loadClientAddress={v => this.loadClientAddress(v)} />
        <Invoice {...{ from, to, id, date, logo, payment, lineItems, emailAddress, phoneNumber, purchaseOrder }} onChange={v => this.setState(v)} />
      </div>
    );
  }
}

export default App;
