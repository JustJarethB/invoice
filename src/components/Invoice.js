import React from 'react';
import TextInput from 'components/TextInput';
import Address from 'components/Address';
import LineItems from 'components/LineItems';
import InvoiceMeta from 'components/InvoiceMeta';

import { ensureFutureCurrency, formatCurrency } from 'utils';

const newLine = () => ({
    description: undefined,
    qty: undefined,
    unitPrice: undefined,
    vatRate: undefined
})

export default class extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            id: 1,
            date: new Date().toLocaleDateString(),
            logo: { url: "//cdn.logo.com/hotlink-ok/enterprise/eid_422203f0-477b-492b-9847-689feab1452a/logo-dark-2020.png" },
            lineItems: [newLine()],
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
                terms: '30 Days',
                method: {
                    type: 'BACS',
                    bankDetails: `Nationwide Building Society
Nationwide House
Pipers Way
Swindon
Wiltshire
SN38 1NW`,
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
        const { from, to, id, date, logo, payment, lineItems, adjustments = 0 } = state;
        const subTotal = lineItems.map(item => (item.qty * item.unitPrice) || 0).reduce((p, c) => p + c, 0);
        const vat = lineItems.map(item => (item.qty * item.unitPrice * item.vatRate) || 0).reduce((p, c) => p + c, 0);
        return (
            <div className="container mx-auto shadow-xl min-h-screen bg-gray-50 p-8">
                <div className="flex">
                    <div className="w-1/2 p-2"><img alt="logo" src={logo.url} style={{ maxHeight: "80px" }} /></div>
                    <div className="w-1/2">
                        <InvoiceMeta id={id} date={date} onChange={s => this.setState(s)} />
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
                                <div className="flex px-2 w-full justify-between">
                                    <p className="self-center font-bold text-lg px-2">Terms</p>
                                    <TextInput className="w-1/2" value={payment.terms} onChange={v => this.setState(() => ({ payment: { ...payment, terms: v } }))} />
                                </div>
                                <div className="flex px-2 w-full justify-between">
                                    <p className="self-center font-bold text-lg px-2">Sort Code</p>
                                    <TextInput className="w-1/2" value={payment.method.sortCode} onChange={v => this.setState(() => ({ payment: { ...payment, method: { ...payment.method, sortCode: v } } }))} />
                                </div>
                                <div className="flex px-2 w-full justify-between">
                                    <p className="self-center font-bold text-lg px-2">Acc. Number</p>
                                    <TextInput className="w-1/2" value={payment.method.number} onChange={v => this.setState(() => ({ payment: { ...payment, method: { ...payment.method, number: v } } }))} />
                                </div>
                                <div className="flex px-2 w-full justify-between">
                                    <p className="font-bold text-lg px-2">Bank Name</p>
                                    <TextInput className="w-1/2" value={payment.method.bankDetails} onChange={v => this.setState(() => ({ payment: { ...payment, method: { ...payment.method, bankDetails: v } } }))} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="p-2">
                            <div className="p-2 w-full ring-4 ring-gray-300 rounded-sm">
                                <h2>Totals:</h2>
                                <div className="p-2">
                                    <div className="flex justify-between">
                                        <p className="font-bold text-lg px-2">Sub Total</p>
                                        <TextInput disabled className="w-1/2 text-gray-500" prefix="£" value={formatCurrency(subTotal)} />
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="font-bold text-lg px-2">VAT</p>
                                        <TextInput className="w-1/2 text-gray-500" prefix="£" value={formatCurrency(vat)} />
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="font-bold text-lg px-2">Adjustments</p>
                                        <TextInput className="w-1/2 text-gray-500" onChange={v => this.setState({ adjustments: ensureFutureCurrency(v) })} prefix="£" value={adjustments} />
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="font-bold text-lg px-2">Total</p>
                                        <TextInput className="w-1/2" prefix="£" value={formatCurrency(subTotal + parseFloat(adjustments, 10))} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="print:hidden">
                    <div className="p-2 w-full flex justify-end">
                        <div className="">

                            <button className="p-2 px-4 rounded-lg hover:bg-gray-600 ring-4 ring-white hover:ring-gray-900 bg-gray-700 text-white font-bold" type="button" onClick={window.print}>Print</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

