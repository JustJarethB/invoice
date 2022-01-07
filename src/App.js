import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage, InvoicePage, ListingPage } from 'pages';
import Header from 'components/Header'

import Database from 'Database';
import { newLine } from 'utils'

const isoDate = d => d.toISOString().slice(0, 10);;

class App extends React.PureComponent {
  constructor() {
    super()
    const now = new Date();
    this.state = {
      from: Database.getDefaultAddress(),
      to: {},
      id: `${now.getTime()}`.substring(0, 10),
      date: isoDate(now),
      logo: { url: "//cdn.logo.com/hotlink-ok/enterprise/eid_422203f0-477b-492b-9847-689feab1452a/logo-dark-2020.png" },
      lineItems: [newLine()],
      purchaseOrder: '---',
      emailAddress: 'JustJarethB@gmail.com',
      phoneNumber: '(+44)7 414 464 648',
      payment: {
        terms: 'NET 30',
        method: {
          type: 'BACS',
          bankName: `Monzo Bank`,
          sortCode: '04-00-04',
          number: '44200929',
        }
      }
    }

  }

  componentDidUpdate(prevProps, prevState) {
    const { state } = this;
    if ((state.id && state.to) && (prevState.id === state.id) && (prevState.to.name === state.to.name)) return;
    const title = `Invoice: ${state.id || "ID"} ${state.to.name || "Client"}`
    document.title = title;
  }

  saveInvoice() {
    // const {id, date, lineItems, purchaseOrder} = this.state;
    Database.saveInvoice({ ...this.state });
  }

  loadClientAddress(index) {
    this.setState({ to: Database.getAllClients()[index].address })
  }

  // loadAllInvoices() {
  //   this.setState({invoices:Database.getAllInvoices()})
  // }

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
    const nav = [
      { name: 'Dashboard', href: '/', element: <HomePage /> },
      { name: 'Listing', href: '/invoices', element: <ListingPage /> },
      { name: 'Projects', href: '/', element: null },
      { name: 'New Invoice', href: '/invoice/new', element: <InvoicePage {...{ from, to, id, date, logo, payment, lineItems, emailAddress, phoneNumber, purchaseOrder }} clients={Database.getAllClients()} loadClientAddress={v => this.loadClientAddress(v)} saveInvoice={() => this.saveInvoice()} onChange={v => this.setState(v)} /> },
    ]
    return (
      <Router>

        <div className="App bg-gray-50">
          <Header navigation={nav} />
          <Routes>
            {nav.map(route => (<Route path={route.href} element={route.element} />))}
            {/* <Route path="/" element={<InvoicePage {...{ from, to, id, date, logo, payment, lineItems, emailAddress, phoneNumber, purchaseOrder }} clients={Database.getAllClients()} loadClientAddress={v => this.loadClientAddress(v)} saveInvoice={() => this.saveInvoice()} onChange={v => this.setState(v)} />} />
            <Route path="/invoices" element={<ListingPage />} /> */}
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
