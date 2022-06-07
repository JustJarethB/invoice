import React from 'react';
import { InputWrapper } from './_internal';

const TextInput = ({ placeholder = '', value = "", onChange, className = "", prefix, suffix }) => {
    const rex = (`${value}`.match(new RegExp(/\n/g)) || []).length;
    const rows = rex + 1;
    return (
        <InputWrapper {...{ className, prefix, suffix }}>
            <textarea disabled={!(onChange && (typeof onChange === "function"))} tabIndex="0" style={{ fontWeight: 'inherit' }} className={`p-1  w-full block bg-transparent outline-none print:placeholder-transparent resize-none ${''}`} {...{ value, placeholder }} onChange={e => onChange(e.currentTarget.value)} rows={rows}>{value}</textarea>
        </InputWrapper>
    )

}
export default TextInput