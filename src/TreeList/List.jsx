import React from 'react'
import {useEffect, useState} from 'react'
import { useNestedList } from './CRUDProvider'


const List = () => {

	const context = useNestedList()
	const [list, setlist] = useState([])

	useEffect(() => {
		setlist(context.render())
	}, [context.items, context.implementation])

	return (
		<>
			{list}
			{/*<pre>{JSON.stringify(context.items, null, ' ')}</pre>*/}
			{/*<br /><br /><br /><br />*/}
			{/*<pre>{JSON.stringify(list, null, ' ')}</pre>*/}
		</>
	)
}

export default List