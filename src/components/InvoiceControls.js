import React from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';

export default ({ clients, loadClientAddress, saveInvoice }) => (
    <div className="print:hidden sticky top-0 bg-gray-50 shadow-sm z-10">
        <div className="container mx-auto">
            <div className="w-full flex justify-end">
                {/* {clients.map((client, i) => <Button onClick={() => loadClientAddress(i)}>{client.displayName}</Button>)} */}
                <DropdownButton options={clients.map(c => ({ ...c, key: c.displayName, value: c.displayName }))} onClick={(v, i) => loadClientAddress(i)}>Clients</DropdownButton>
                <Button onClick={window.print}>Print</Button>
                <Button onClick={saveInvoice}>Save</Button>
            </div>
        </div>
    </div>
)

const Button = ({ children, onClick }) => (
    <div className="p-2">
        <button className="p-2 px-4 rounded-lg hover:bg-gray-600 ring-2 ring-white hover:ring-gray-900 bg-gray-700 text-white font-bold" type="button" onClick={onClick}>{children}</button>
    </div>
)


class DropdownButton extends React.PureComponent {
    constructor() {
        super();
        this.state = { open: false };
        this.iconClasses = "-mr-1 ml-2 h-5 w-5"
    }

    handleClick(...args) {
        const { onClick } = this.props;
        onClick(...args);
        this.setState({ open: false })
    }

    render() {
        const { options, children } = this.props;
        const { open } = this.state;
        return (

            <div className="p-2 group">
                <div className='relative'>
                    <button className={`p-2 px-4 rounded-t-lg ${open || 'rounded-b-lg'} transition-all group-hover:bg-gray-600 ring-2 ring-white group-hover:ring-gray-900 bg-gray-700 text-white font-bold flex items-center`} type="button" onClick={() => this.setState({ open: !open })}>{children}{open ? <ChevronUpIcon className={this.iconClasses} /> : <ChevronDownIcon className={this.iconClasses} />}</button>
                    <div className={`absolute bg-gray-700 rounded-b-lg transition-all ring-2 ring-white group-hover:ring-gray-900 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        {options.map(({ key, value }, i) => (
                            <button key={key} className=' text-white text-xs block w-full justify-center px-2 py-1 hover:bg-gray-600' type="button" value={value} onClick={() => this.handleClick(value, i)}>{key}</button>
                        ))}
                    </div>
                </div>
            </div>

        )
    }
}