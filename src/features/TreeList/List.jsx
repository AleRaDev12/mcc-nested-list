import React from 'react'
import {useNestedList} from './CRUDProvider'
import ListLinear from './ListLinear'
import ListNested from './ListNested'


const List = () => {

	const context = useNestedList()

	const {type, items} = context.getItems()
	console.log(type, items)

	return (
		<>
			{type === 'linear' && <ListLinear items={items}/>}
			{type === 'nested' && <ListNested items={items}/>}
		</>
	)
}

export default List