import React from 'react'
import {useNestedList} from './CRUDProvider'


const DataPrint = () => {

	const context = useNestedList()

	return (
		<pre className="bg-gray-900 rounded-lg p-3 overflow-auto">
			Размер данных: {context.defaultData && JSON.stringify(context.defaultData).length}
			<br/>
			{context.defaultData && JSON.stringify(context.defaultData, null, ' ')}
        </pre>
	)
}

export default DataPrint