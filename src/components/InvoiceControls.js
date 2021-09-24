import React from 'react';

export default ({ clients, loadClientAddress }) => (
    <div className="print:hidden sticky top-0 bg-gray-50 shadow-sm z-10">
        <div className="container mx-auto">
            <div className="w-full flex justify-end">
                {clients.map((client, i) => <Button onClick={() => loadClientAddress(i)}>{client.displayName}</Button>)}
                <Button onClick={window.print}>Print</Button>
                <Button>Save</Button>
            </div>
        </div>
    </div>
)

const Button = ({ children, onClick }) => (
    <div className="p-2">
        <button className="p-2 px-4 rounded-lg hover:bg-gray-600 ring-2 ring-white hover:ring-gray-900 bg-gray-700 text-white font-bold" type="button" onClick={onClick}>{children}</button>
    </div>
)
