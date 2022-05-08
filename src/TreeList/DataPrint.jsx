import React, {useEffect} from 'react';
import {useNestedList} from "./CRUDProvider";

const DataPrint = () => {

    const context = useNestedList()

    // useEffect(() => {
    //     console.log('update')
    // }, [context.items])

    return (
        <div className="ml-5 min-w-[300px] grow-0">
            <h1 className="text-2xl font-bold mb-5">Данные</h1>
            <pre className="bg-gray-900 rounded-lg">
            {JSON.stringify(context.items, null, ' ')}
        </pre>
        </div>
    );
};

export default DataPrint;