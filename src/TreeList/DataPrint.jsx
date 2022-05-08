import React from 'react'
import {useNestedList} from './CRUDProvider'


const DataPrint = () => {

	const context = useNestedList()

	return (
		<pre className="bg-gray-900 rounded-lg p-3 overflow-auto">
            {JSON.stringify(context.items, null, ' ')}
        </pre>
	)
}

export default DataPrint