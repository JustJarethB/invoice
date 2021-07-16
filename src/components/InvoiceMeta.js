import React from 'react';
import TextInput from 'components/TextInput';

export default ({ id, date, onChange }) => (
    <div className="p-2">
        <div className="p-2 w-full ring-4 ring-gray-300 rounded-sm">
            <div className="flex items-center">
                <p className="font-bold text-lg px-2">Invoice #</p>
                <TextInput value={id} onChange={v => onChange({ id: v })} />
            </div>
            <div className="flex items-center">
                <p className="font-bold text-lg px-2">Date</p>
                <TextInput value={date} onChange={v => onChange({ date: v })} />
            </div>
        </div>
    </div>

)