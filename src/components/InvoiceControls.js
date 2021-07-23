import React from 'react';

export default () => (
    <div className="print:hidden sticky top-0 bg-gray-50 shadow-sm z-10">
        <div className="container mx-auto">
            <div className="w-full flex justify-end">
                <div className="p-2">
                    <button className="p-2 px-4 rounded-lg hover:bg-gray-600 ring-2 ring-white hover:ring-gray-900 bg-gray-700 text-white font-bold" type="button" onClick={window.print}>Print</button>
                </div>
                <div className="p-2">
                    <button className="p-2 px-4 rounded-lg hover:bg-gray-600 ring-2 ring-white hover:ring-gray-900 bg-gray-700 text-white font-bold" type="button" onClick={null}>Save</button>
                </div>
            </div>
        </div>
    </div>
)

