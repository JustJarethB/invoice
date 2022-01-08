import React from "react";
import { TextInput, DateInput, SelectInput } from "components/Inputs";

import { ensureFutureCurrency, formatCurrency } from 'utils';

const lineTypeOptions = [
    { label: 'Service', value: 0 },
    { label: 'Rental', value: 1 },
    { label: 'Expense', value: 2 }
]

const lineUnitOptions = [
    'Hourly',
    'Daily',
    'Consolidated Items'
]

// const getVatRates = () => ([{ label: "20", value: .2 }, { label: "5", value: .05 }, { label: "N/A", value: 0 }])

const LineItems = ({ data, onChange }) => (
    <div className="p-2 table">
        <div className="pb-2 table-row">
            <div className="p-2 table-cell font-bold">Service Date</div>
            <div className="p-2 table-cell print:hidden font-bold">Type</div>
            <div className="p-2 table-cell font-bold">Ref</div>
            <div className="p-2 table-cell font-bold">Unit</div>
            <div className="p-2 table-cell font-bold">Quantity</div>
            <div className="p-2 table-cell font-bold">Unit Price</div>
            {/* <div className="p-2 table-cell font-bold">VAT Rate</div>
            <div className="p-2 table-cell font-bold">VAT</div> */}
            <div className="p-2 table-cell font-bold">Total</div>
        </div>
        <div className="ring-4 ring-gray-300 rounded-sm table-row-group">
            {/* Need to give key that doesn't change with UserInput, can't use index either */}
            {data.map((l, i) => <LineItem index={i} item={l} onChange={d => onChange({ id: i, data: d })} className={(i === data.length - 1) ? "print:hidden" : ""} />)}
        </div>
    </div>
)


const LineItem = ({ index, item = {}, onChange, className }) => (
    <div className={`flex ${index % 2 && "bg-gray-100"} table-row print:text-xs ${className}`} >
        <div className="p-1 table-cell ">
            <DateInput className="w-full font-bold" value={item.date} onChange={(v) => onChange({ date: v })} />
        </div>
        <div className="p-1 table-cell print:hidden ">
            <SelectInput options={lineTypeOptions} className="w-full font-bold" value={item.type} onChange={(v) => onChange({ type: v })} />
        </div>
        <div className="p-1 table-cell ">
            <TextInput className="w-full font-bold" value={item.ref} onChange={(v) => onChange({ ref: v })} />
        </div>
        <div className="p-1 table-cell ">
            <SelectInput options={lineUnitOptions} className="w-full font-bold" value={item.name} onChange={(v) => onChange({ name: v })} />
        </div>
        <div className="p-1 table-cell ">
            <TextInput className="w-full font-bold" value={item.qty} onChange={(v) => onChange({ qty: v })} />
        </div>
        <div className="p-1 table-cell ">
            <TextInput className="w-full font-bold" prefix="£" value={(item.unitPrice)} onChange={(v) => onChange({ unitPrice: ensureFutureCurrency(v) })} />
        </div>
        <div className="p-1 table-cell ">
            <TextInput className="w-full font-bold" prefix="£" value={formatCurrency(item.qty * item.unitPrice) || undefined} />
        </div>
    </div>
)
export default LineItems