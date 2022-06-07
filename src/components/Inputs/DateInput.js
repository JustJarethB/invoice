import React from 'react';
import { InputWrapper } from './_internal';

const DateInput = ({ placeholder = '', value = "", onChange, className = "", prefix, suffix }) => {
    const rex = (`${value}`.match(new RegExp(/\n/g)) || []).length;
    const rows = rex + 1;
    return (
        <InputWrapper {...{ className, prefix, suffix }}>
            <input type="date" disabled={!(onChange && (typeof onChange === "function"))} tabIndex="0" style={{ fontWeight: 'inherit' }} className={`p-1  w-full block bg-transparent outline-none resize-none ${value ? '' : 'text-gray-400 print:hidden'}`} {...{ value, placeholder }} onChange={e => onChange(e.currentTarget.value)} rows={rows} />
        </InputWrapper>
    )

}

export default DateInput;