import React from 'react';

export default ({ placeholder = '', value = "", onChange, className = "", prefix, suffix, options = [] }) => {
    if (!value) {
        [{ label: "---", value: "" }].concat(options);
    }
    return (
        <div className={`${className} ${(prefix || suffix || true) && 'relative'}`}>
            <div className="flex rounded-lg focus-within:bg-white  focus-within:ring-2 focus-within:ring-gray-300">
                <Prefix prefix={prefix} />
                <select disabled={!(onChange && (typeof onChange === "function"))} tabIndex="0" style={{ fontWeight: 'inherit' }} className={`p-1  w-full block bg-transparent outline-none appearance-none ${''}`} {...{ value, placeholder }} onChange={e => onChange(e.currentTarget.value)}>
                    {[{ label: "---", value: "" }].concat(options).map(({ label, value: v }) => <option selected={v === value} value={v}>{label}</option>)}
                </select>
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