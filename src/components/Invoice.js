import React from 'react';
import TextInput from 'components/TextInput';
import Address from 'components/Address';
import LineItems from 'components/LineItems';
import InvoiceMeta from 'components/InvoiceMeta';

import { formatCurrency, newLine } from 'utils';

export default class extends React.PureComponent {
    // constructor() {
    //     super();
    // }

    // componentDidMount() {
    //     this.updateLineItem();
    // }

    componentDidUpdate() {
        const state = this.props;
        const { lineItems } = state;
        const lastLine = lineItems[lineItems.length - 1];
        const hasContent = Object.keys(lastLine).map(k => lastLine[k]).filter(v => !!v).length;
        if (hasContent) {
            this.updateLineItem()
        }
    }

    updateLineItem(newState = {}) {
        const state = this.props;
        const { onChange } = state;
        const newLineItems = [...state.lineItems];
        const { id, data } = newState;
        if (id !== undefined) {
            newLineItems[id] = { ...newLineItems[id], ...data };
            onChange({ lineItems: newLineItems });
            return true;
        }
        newLineItems.push(newLine())
        onChange({ lineItems: newLineItems });
        return false;
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
            onChange
        } = this.props;
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
                        <InvoiceMeta id={id} date={date} purchaseOrder={purchaseOrder} onChange={s => onChange(s)} />
                    </div>
                </div>
                <div className="flex justify-between">
                    <Address title='From:' address={from} onChange={d => onChange({ from: { ...from, ...d } })} />
                    <Address title='To:' address={to} onChange={d => onChange({ to: { ...to, ...d } })} />
                </div>
                <LineItems data={lineItems} onChange={(o) => this.updateLineItem(o)} />
                <div className="w-full flex">
                    <div className="w-2/3">
                        <div className="p-2">
                            <div className="p-2 w-full ring-4 ring-gray-300 rounded-sm">
                                <h2>Payment:</h2>
                                <div className="p-2">
                                    <StandardField title="Payment Terms" value={payment.terms} onChange={v => onChange(() => ({ payment: { ...payment, terms: v } }))} />
                                    <StandardField title="Sort Code" value={payment.method.sortCode} onChange={v => onChange(() => ({ payment: { ...payment, method: { ...payment.method, sortCode: v } } }))} />
                                    <StandardField title="Acc. Number" value={payment.method.number} onChange={v => onChange(() => ({ payment: { ...payment, method: { ...payment.method, number: v } } }))} />
                                    <StandardField title="Bank Name" value={payment.method.bankName} onChange={v => onChange(() => ({ payment: { ...payment, method: { ...payment.method, bankName: v } } }))} />
                                    <StandardField title="Contact Email" value={emailAddress} onChange={v => onChange(() => ({ emailAddress: v }))} />
                                    <StandardField title="Contact Number" value={phoneNumber} onChange={v => onChange(() => ({ phoneNumber: v }))} />
                                    {/* <StandardField title="Additional Information" value="Please reference the invoice id during payment" /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3">
                        <div className="p-2">
                            <div className="p-2 w-full ring-4 ring-gray-300 rounded-sm">
                                <h2>Totals:</h2>
                                <div className="p-2">
                                    <StandardField title="Services" prefix="£" parentClass="text-gray-500" value={formatCurrency(serviceSubTotal)} />
                                    {/* <StandardField title="Rental" prefix="£" parentClass="text-gray-500" value={formatCurrency(rentalSubTotal)} /> */}
                                    {/* <StandardField title="Expenses" prefix="£" parentClass="text-gray-500" value={formatCurrency(expenseSubTotal)} /> */}
                                    {/* <StandardField title="VAT" parentClass="text-gray-500" value={formatCurrency(vat)} /> */}
                                    <hr className="py-2" />
                                    <StandardField title="Total" prefix="£" parentClass="" value={formatCurrency(serviceSubTotal + rentalSubTotal + expenseSubTotal)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const StandardField = ({ title, prefix, suffix, value, onChange, className, parentClass }) => (
    <div className={`flex justify-between ${parentClass}`}>
        <p className="font-bold px-2">{title}</p>
        <TextInput className={`w-1/2 ${className}`} {...{ prefix, suffix, value, onChange }} />
    </div>

)