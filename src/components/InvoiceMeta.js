import React from 'react';
import { TextInput, DateInput } from 'components/Inputs';

const InvoiceMeta = ({ id, date, purchaseOrder, onChange }) => (
    <div className="p-2">
        <div className="p-2 w-full ring-4 ring-gray-300 rounded-sm">
            <div className="flex items-center">
                <p className="font-bold px-2 whitespace-nowrap">Invoice Ref</p>
                <TextInput className="w-full" value={id} onChange={v => onChange({ id: v })} />
            </div>
            <div className="flex items-center">
                <p className="font-bold px-2 whitespace-nowrap">Tax Date</p>
                <DateInput className="w-full" value={date} onChange={v => onChange({ date: v })} />
            </div>
            <div className="flex items-center">
                <p className="font-bold px-2 whitespace-nowrap">PO / Reference</p>
                <TextInput className="w-full" value={purchaseOrder} onChange={v => onChange({ purchaseOrder: v })} />
            </div>
        </div>
    </div>

)
export default InvoiceMeta