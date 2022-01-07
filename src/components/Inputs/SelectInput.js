import React from 'react';

export default ({ placeholder = '', value = "", onChange, className = "", prefix, suffix, options = [] }) => {
    const optionsToUse = options.map(v => typeof v !== 'string' ? v : ({ label: v, value: v }));
    if (!value) {
        optionsToUse.unshift({ label: "---", value: "", disabled: true });
    }
    return (
        <div className={`${className} ${(prefix || suffix || true) && 'relative'}`}>
            <div className="flex rounded-lg focus-within:bg-white  focus-within:ring-2 focus-within:ring-gray-300">
                <Prefix prefix={prefix} />
                <select disabled={!(onChange && (typeof onChange === "function"))} tabIndex="0" style={{ fontWeight: 'inherit' }} className={`p-1  w-full block bg-transparent outline-none appearance-none ${value ? '' : 'text-gray-400'}`} {...{ value, placeholder }} onChange={e => onChange(e.currentTarget.value)}>
                    {optionsToUse.map(({ label, value: v, disabled = false }) => <option key={v} disabled={disabled} value={v}>{label}</option>)}
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