import React from 'react';
import { InputWrapper } from './_internal';

const SelectInput = ({ placeholder = '', value = "", onChange, className = "", prefix, suffix, options = [] }) => {
    const optionsToUse = options.map(v => typeof v !== 'string' ? v : ({ label: v, value: v }));
    if (!value) {
        optionsToUse.unshift({ label: "---", value: "", disabled: true });
    }
    return (
        <InputWrapper {...{ className, prefix, suffix }}>
            <select disabled={!(onChange && (typeof onChange === "function"))} tabIndex="0" style={{ fontWeight: 'inherit' }} className={`p-1  w-full block bg-transparent outline-none appearance-none ${value ? '' : 'text-gray-400'}`} {...{ value, placeholder }} onChange={e => onChange(e.currentTarget.value)}>
                {optionsToUse.map(({ label, value: v, disabled = false }) => <option key={v} disabled={disabled} value={v}>{label}</option>)}
            </select>
        </InputWrapper>
    )

}


export default SelectInput