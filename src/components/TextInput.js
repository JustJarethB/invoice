import React from 'react';

export default ({ placeholder = '', value = "", onChange, className = "" }) => {
    const rex = (`${value}`.match(new RegExp(/\n/g)) || []).length;
    const rows = rex + 1;
    return (
        <div className={`${className}`}>
            <textarea disabled={!(onChange && (typeof onChange === "function"))} tabIndex="0" style={{ fontWeight: 'inherit' }} className={`rounded-lg p-1 focus:ring-2 focus:ring-gray-300 w-full block bg-transparent focus:bg-white outline-none resize-none ${''}`} {...{ value, placeholder }} onChange={e => onChange(e.currentTarget.value)} rows={rows}>{value}</textarea>
        </div>
    )
}