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
const defaultHeaderClasses = "p-2 table-cell font-bold"
const defaultOuterCellClasses = "p-1 table-cell"
const defaultInnerCellClasses = "w-full font-bold"
const LineItems = ({ data, onChange }) => (
    <div className="p-2 table">
        <div className="pb-2 table-row">
            <div className={defaultHeaderClasses}>Service Date</div>
            <div className={`${defaultHeaderClasses} print:hidden`}>Type</div>
            <div className={defaultHeaderClasses}>Ref</div>
            <div className={defaultHeaderClasses}>Unit</div>
            <div className={defaultHeaderClasses}>Quantity</div>
            <div className={defaultHeaderClasses}>Unit Price</div>
            {/* <div className={defaultHeaderClasses}>VAT Rate</div>
            <div className={defaultHeaderClasses}>VAT</div> */}
            <div className={defaultHeaderClasses}>Total</div>
        </div>
        <div className="ring-4 ring-gray-300 rounded-sm table-row-group">
            {/* Need to give key that doesn't change with UserInput, can't use index either */}
            {data.map((l, i) => <LineItem index={i} item={l} onChange={d => onChange({ id: i, data: d })} className={(i === data.length - 1) ? "print:hidden" : ""} />)}
        </div>
    </div>
)


const LineItem = ({ index, item = {}, onChange, className }) => (
    <div className={`flex ${index % 2 && "bg-gray-100"} table-row print:text-xs ${className}`} >
        <div className={defaultOuterCellClasses}>
            <DateInput className={defaultInnerCellClasses} value={item.date} onChange={(v) => onChange({ date: v })} />
        </div>
        <div className={`${defaultOuterCellClasses} print:hidden`}>
            <SelectInput options={lineTypeOptions} className={defaultInnerCellClasses} value={item.type} onChange={(v) => onChange({ type: v })} />
        </div>
        <div className={defaultOuterCellClasses}>
            <TextInput className={defaultInnerCellClasses} value={item.ref} onChange={(v) => onChange({ ref: v })} />
        </div>
        <div className={defaultOuterCellClasses}>
            <SelectInput options={lineUnitOptions} className={defaultInnerCellClasses} value={item.name} onChange={(v) => onChange({ name: v })} />
        </div>
        <div className={defaultOuterCellClasses}>
            <TextInput className={defaultInnerCellClasses} value={item.qty} onChange={(v) => onChange({ qty: v })} />
        </div>
        <div className={defaultOuterCellClasses}>
            <TextInput className={defaultInnerCellClasses} prefix="£" value={(item.unitPrice)} onChange={(v) => onChange({ unitPrice: ensureFutureCurrency(v) })} />
        </div>
        <div className={defaultOuterCellClasses}>
            <TextInput className={defaultInnerCellClasses} prefix="£" value={formatCurrency(item.qty * item.unitPrice) || undefined} />
        </div>
    </div>
)
export default LineItems