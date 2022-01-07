import React from 'react';

import Invoice from 'components/Invoice';
import InvoiceControls from 'components/InvoiceControls';


export const ListingPage = () => (<h1>Listing Page</h1>);
export const LoginPage = () => (<h1>Login Page</h1>);
export const HomePage = () => (<h1>Home Page</h1>);
export const InvoicePage = ({ clients, loadClientAddress, saveInvoice, from, to, id, date, logo, payment, lineItems, emailAddress, phoneNumber, purchaseOrder, onChange }) => (
    <div>
        <InvoiceControls clients={clients} loadClientAddress={loadClientAddress} saveInvoice={saveInvoice} />
        <Invoice {...{ from, to, id, date, logo, payment, lineItems, emailAddress, phoneNumber, purchaseOrder }} onChange={onChange} />
    </div>
);
