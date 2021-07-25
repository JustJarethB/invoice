import React from 'react';
import TextInput from 'components/TextInput';
import Address from 'components/Address';
import LineItems from 'components/LineItems';
import InvoiceMeta from 'components/InvoiceMeta';

import { formatCurrency } from 'utils';
// import { ensureFutureCurrency, formatCurrency } from 'utils';

const newLine = () => ({
    date: undefined,
    name: undefined,
    description: undefined,
    qty: undefined,
    unitPrice: undefined,
    vatRate: undefined,
})

export default class extends React.PureComponent {
    constructor() {
        super();
        const now = new Date();
        this.state = {
            id: `${now.getTime()}`.substring(0, 10),
            date: now.toLocaleDateString(),
            logo: { url: "//cdn.logo.com/hotlink-ok/enterprise/eid_422203f0-477b-492b-9847-689feab1452a/logo-dark-2020.png" },
            lineItems: [newLine()],
            purchaseOrder: '---',
            emailAddress: 'JustJarethB@gmail.com',
            phoneNumber: '(+44)7 414 464 648',
            from: {
                name: 'Jareth Bower',
                address: 'London School of Theology, Green Lane',
                postcode: 'HA6 2UW'
            },

            to: {
                name: 'Soul Survivor Watford',
                address: 'Warehouse 5, Greycaine Road',
                postcode: 'WD24 7GP'
            },
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
        this.updateLineItem();
    }

    componentDidUpdate() {
        const { state } = this;
        const { lineItems } = state;
        const lastLine = lineItems[lineItems.length - 1];
        const hasContent = Object.keys(lastLine).map(k => lastLine[k]).filter(v => !!v).length;
        if (hasContent) {
            this.updateLineItem()
        }
    }

    updateLineItem(newState = {}) {
        const { state } = this;
        const newLineItems = [...state.lineItems];
        const { id, data } = newState;
        if (id !== undefined) {
            newLineItems[id] = { ...newLineItems[id], ...data };
            this.setState({ lineItems: newLineItems });
            return true;
        }
        newLineItems.push(newLine())
        this.setState({ lineItems: newLineItems });
        return false;
    }


    render() {
        const { state } = this;
        const { from, to, id, date, logo, payment, lineItems, emailAddress, phoneNumber, purchaseOrder = 0 } = state;
        const subTotal = lineItems.map(item => (item.qty * item.unitPrice) || 0).reduce((p, c) => p + c, 0);
        const serviceSubTotal = subTotal;
        const rentalSubTotal = 0;
        const expenseSubTotal = 0;
        // const vat = lineItems.map(item => (item.qty * item.unitPrice * item.vatRate) || 0).reduce((p, c) => p + c, 0);
        return (
            <div className="container mx-auto shadow-xl min-h-screen bg-gray-50 p-8">
                <div className="flex">
                    <div className="w-1/2 p-2"><img alt="logo" src={logo.url} style={{ maxHeight: "80px" }} /></div>
                    <div className="w-1/2">
                        <InvoiceMeta id={id} date={date} purchaseOrder={purchaseOrder} onChange={s => this.setState(s)} />
                    </div>
                </div>
                <div className="flex justify-between">
                    <Address title='From:' address={from} onChange={d => this.setState({ from: { ...from, ...d } })} />
                    <Address title='To:' address={to} onChange={d => this.setState({ to: { ...to, ...d } })} />
                </div>
                <LineItems data={lineItems} onChange={(o) => this.updateLineItem(o)} />
                <div className="w-full flex">
                    <div className="w-1/2">
                        <div className="p-2">
                            <div className="p-2 w-full ring-4 ring-gray-300 rounded-sm">
                                <h2>Payment:</h2>
                                <div className="p-2">
                                    <StandardField title="Payment Terms" value={payment.terms} onChange={v => this.setState(() => ({ payment: { ...payment, terms: v } }))} />
                                    <StandardField title="Sort Code" value={payment.method.sortCode} onChange={v => this.setState(() => ({ payment: { ...payment, method: { ...payment.method, sortCode: v } } }))} />
                                    <StandardField title="Acc. Number" value={payment.method.number} onChange={v => this.setState(() => ({ payment: { ...payment, method: { ...payment.method, number: v } } }))} />
                                    <StandardField title="Bank Name" value={payment.method.bankName} onChange={v => this.setState(() => ({ payment: { ...payment, method: { ...payment.method, bankName: v } } }))} />
                                    <StandardField title="Contact Email" value={emailAddress} onChange={v => this.setState(() => ({ emailAddress: v }))} />
                                    <StandardField title="Contact Number" value={phoneNumber} onChange={v => this.setState(() => ({ phoneNumber: v }))} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="p-2">
                            <div className="p-2 w-full ring-4 ring-gray-300 rounded-sm">
                                <h2>Totals:</h2>
                                <div className="p-2">
                                    <StandardField title="Services Sub Total" prefix="£" className="text-gray-500" value={formatCurrency(serviceSubTotal)} />
                                    <StandardField title="Rental Sub Total" prefix="£" className="text-gray-500" value={formatCurrency(rentalSubTotal)} />
                                    <StandardField title="Expenses Sub Total" prefix="£" className="text-gray-500" value={formatCurrency(expenseSubTotal)} />
                                    {/* <StandardField title="VAT" className="text-gray-500" value={formatCurrency(vat)} /> */}
                                    <StandardField title="Total" prefix="£" value={formatCurrency(serviceSubTotal + rentalSubTotal + expenseSubTotal)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const StandardField = ({ title, prefix, suffix, value, onChange, className }) => (
    <div className="flex justify-between">
        <p className="font-bold text-lg px-2">{title}</p>
        <TextInput className={`w-1/2 ${className}`} {...{ prefix, suffix, value, onChange }} />
    </div>

)