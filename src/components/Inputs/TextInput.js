import React from 'react';

const TextInput = ({ placeholder = '', value = "", onChange, className = "", prefix, suffix }) => {
    const rex = (`${value}`.match(new RegExp(/\n/g)) || []).length;
    const rows = rex + 1;
    return (
        <div className={`${className} ${(prefix || suffix || true) && 'relative'}`}>
            <div className="flex rounded-lg focus-within:bg-white  focus-within:ring-2 focus-within:ring-gray-300">
                <Prefix prefix={prefix} />
                <textarea disabled={!(onChange && (typeof onChange === "function"))} tabIndex="0" style={{ fontWeight: 'inherit' }} className={`p-1  w-full block bg-transparent outline-none resize-none ${''}`} {...{ value, placeholder }} onChange={e => onChange(e.currentTarget.value)} rows={rows}>{value}</textarea>
                <Suffix suffix={suffix} />
            </div>
        </div>
    )

}
const Prefix = ({ prefix }) => {
    if (!prefix) return null;
    return (
        <div className="pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{prefix}</span>
        </div>
    )
}
const Suffix = ({ suffix }) => {
    if (!suffix) return null;
    return (
        <div className="pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{suffix}</span>
        </div>
    )
}
export default TextInput