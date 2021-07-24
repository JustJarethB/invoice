import React from 'react';
import TextInput from 'components/TextInput';

export default ({ id, date, purchaseOrder, onChange }) => (
    <div className="p-2">
        <div className="p-2 w-full ring-4 ring-gray-300 rounded-sm">
            <div className="flex items-center">
                <p className="font-bold text-lg px-2">Invoice Ref</p>
                <TextInput value={id} onChange={v => onChange({ id: v })} />
            </div>
            <div className="flex items-center">
                <p className="font-bold text-lg px-2">Tax Date</p>
                <TextInput value={date} onChange={v => onChange({ date: v })} />
            </div>
            <div className="flex items-center">
                <p className="font-bold text-lg px-2">Purchase Order</p>
                <TextInput value={purchaseOrder} onChange={v => onChange({ purchaseOrder: v })} />
            </div>
        </div>
    </div>

)