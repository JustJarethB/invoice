import React from 'react';
import TextInput from 'components/TextInput';

const setLineItem = currentState => id => data => {
    // console.log(id, data, currentState);
    const line = { ...currentState[id], ...data };
    const newState = [...currentState];
    newState[id] = line;
    // console.log(newState)
    return newState;

}

export default class extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            id: 1,
            date: new Date().toLocaleDateString(),
            logo: { url: "//cdn.logo.com/hotlink-ok/enterprise/eid_422203f0-477b-492b-9847-689feab1452a/logo-dark-2020.png" },
            lineItems: [],
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
    }

    render() {
        const { state } = this;
        console.log("***STATE***")
        console.log(state)
        console.log("***STATE***")
        const { from, to, id, date, logo, payment, lineItems } = state;
        const setLineItemState = setLineItem(lineItems);
        return (
            <div className="container mx-auto shadow-xl min-h-screen bg-gray-50 p-8">
                <div className="flex">
                    <div className="w-1/2 p-2"><img alt="logo" src={logo.url} className="w-1/2" /></div>
                    <div className="w-1/2">
                        <div className="p-2">
                            <div className="p-2 w-full ring-4 ring-gray-300 rounded-sm">
                                <div className="flex items-center">
                                    <p className="font-bold text-lg px-2">Invoice #</p>
                                    <TextInput value={id} onChange={v => this.setState({ id: v })} />
                                </div>
                                <div className="flex items-center">
                                    <p className="font-bold text-lg px-2">Date</p>
                                    <TextInput value={date} onChange={v => this.setState({ date: v })} />
                                </div>
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="p-2 w-full ring-4 ring-gray-300 rounded-sm">
                                <h2>Payment:</h2>
                                <div className="flex items-center px-2 w-full">
                                    <p className="font-bold text-lg px-2">Terms</p>
                                    <TextInput value={payment.terms} onChange={v => this.setState(() => ({ payment: { ...payment, terms: v } }))} />
                                </div>
                                <div className="flex items-center px-2 w-full">
                                    <p className="font-bold text-lg px-2">Sort Code</p>
                                    <TextInput value={payment.method.sortCode} onChange={v => this.setState(() => ({ payment: { ...payment, method: { ...payment.method, sortCode: v } } }))} />
                                </div>
                                <div className="flex items-center px-2 w-full">
                                    <p className="font-bold text-lg px-2">Acc. Number</p>
                                    <TextInput value={payment.method.number} onChange={v => this.setState(() => ({ payment: { ...payment, method: { ...payment.method, number: v } } }))} />
                                </div>
                                <div className="flex px-2 w-full">
                                    <p className="font-bold text-lg px-2">Bank Name</p>
                                    <TextInput value={payment.method.bankDetails} onChange={v => this.setState(() => ({ payment: { ...payment, method: { ...payment.method, bankDetails: v } } }))} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <Address title='From:' type="from" address={from} onChange={d => this.setState({ from: { ...from, ...d } })} />
                    <Address title='To:' type="to" address={to} onChange={d => this.setState({ to: { ...to, ...d } })} />
                </div>
                <div className="p-2">
                    <div className="pb-2 flex">
                        <div className="p-2 w-1/6 font-bold">Description</div>
                        <div className="p-2 w-1/6 font-bold">Quantity</div>
                        <div className="p-2 w-1/6 font-bold">Unit Price</div>
                        <div className="p-2 w-1/6 font-bold">VAT Rate</div>
                        <div className="p-2 w-1/6 font-bold">VAT</div>
                        <div className="p-2 w-1/6 font-bold">Total</div>
                    </div>
                    <div className="ring-4 ring-gray-300 rounded-sm">
                        {/* TODO: fix setState */}
                        {lineItems.map((l, i) => <LineItem index={i} item={l} onChange={data => this.setState({ lineItems: setLineItemState(i)(data) })} />)}
                        <LineItem index={lineItems.length} onChange={data => this.setState({ lineItems: setLineItemState(lineItems.length)(data) })} />
                    </div>
                </div>
            </div>
        );
    }
}

const LineItem = ({ index, item = {}, onChange }) => (
    <div className={`flex ${index % 2 && "bg-gray-100"}`} >
        <div className="p-1 w-1/6">
            <TextInput className="w-full font-bold" value={item.description} onChange={(v) => onChange({ description: v })} />
        </div>
        <div className="p-1 w-1/6">
            <TextInput className="w-full font-bold" value={item.qty} onChange={(v) => onChange({ qty: v })} />
        </div>
        <div className="p-1 w-1/6">
            <TextInput className="w-full font-bold" prefix="£" value={item.unitPrice} onChange={(v) => onChange({ unitPrice: v })} />
        </div>
        <div className="p-1 w-1/6">
            <TextInput className="w-full font-bold" prefix="%" value={item.vatRate * 100 || undefined} onChange={(v) => onChange({ vatRate: v / 100 })} />
        </div>
        <div className="p-1 w-1/6">
            <TextInput className="w-full font-bold" prefix="£" value={(item.qty * item.unitPrice * item.vatRate) || undefined} />
        </div>
        <div className="p-1 w-1/6">
            <TextInput className="w-full font-bold" prefix="£" value={(item.qty * item.unitPrice) || undefined} />
        </div>
    </div>
)

const Address = ({ address, onChange, className = 0, title }) => (
    <div className={` w-full md:w-1/2 ${className} p-2`}>
        <div className="w-full ring-4 ring-gray-300 rounded-sm p-2">
            <h2>{title}</h2>
            <TextInput value={address.name} className="text-2xl pb-8 w-full px-2 font-bold" placeholder="Name" onChange={v => onChange({ name: v })} />
            <TextInput value={address.address} className="w-full px-2 font-bold" placeholder="Name" onChange={v => onChange({ address: v })} />
            <TextInput value={address.postcode} className="w-full px-2 font-bold" placeholder="Name" onChange={v => onChange({ postcode: v })} />
        </div>
    </div>
)