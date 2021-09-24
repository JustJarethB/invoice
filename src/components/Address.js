import React from 'react';
import TextInput from 'components/TextInput';

export default ({ address, onChange, className = 0, title }) => (
    <div className={` w-full md:w-1/2 ${className} p-2`}>
        <div className="w-full ring-4 ring-gray-300 rounded-sm p-2">
            <h2>{title}</h2>
            <TextInput value={address.name} className="text-2xl pb-8 w-full px-2 font-bold" placeholder="Name" onChange={v => onChange({ name: v })} />
            <TextInput value={address.address} className="w-full px-2 font-bold" placeholder="Address" onChange={v => onChange({ address: v })} />
            <TextInput value={address.postCode} className="w-full px-2 font-bold" placeholder="Postcode" onChange={v => onChange({ postCode: v })} />
        </div>
    </div>
)