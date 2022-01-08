import React from "react";

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

const InputWrapper = ({ className, prefix, suffix, children }) => (
    <div className={`${className} ${(prefix || suffix || true) && 'relative'}`}>
        <div className="flex rounded-lg focus-within:bg-white  focus-within:ring-2 focus-within:ring-gray-300">
            <Prefix prefix={prefix} />
            {children}
            <Suffix suffix={suffix} />
        </div>
    </div>
)

export { Prefix, Suffix, InputWrapper };