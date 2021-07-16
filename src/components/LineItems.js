import React from "react";
import TextInput from "components/TextInput";

export default ({ data, onChange }) => (
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
            {data.map((l, i) => <LineItem index={i} item={l} onChange={d => onChange({ id: i, data: d })} />)}
        </div>
    </div>
)


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