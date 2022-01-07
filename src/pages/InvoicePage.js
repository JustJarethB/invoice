import React from 'react';
import { Invoice, InvoiceControls } from 'components';

export default ({ clients, loadClientAddress, saveInvoice, from, to, id, date, logo, payment, lineItems, emailAddress, phoneNumber, purchaseOrder, onChange }) => (
    <div>
        <InvoiceControls clients={clients} loadClientAddress={loadClientAddress} saveInvoice={saveInvoice} />
        <Invoice {...{ from, to, id, date, logo, payment, lineItems, emailAddress, phoneNumber, purchaseOrder }} onChange={onChange} />
    </div>
);