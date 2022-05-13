import React, {useEffect} from 'react'
import {useNestedList} from './CRUDProvider'
import ListLinear from './ListLinear'
import ListNested from './ListNested'


const List = () => {

	const context = useNestedList()

	useEffect(() => {

	})
	const items = context.getItems()
	const type = context.getType()

	return (
		<>
			{type === 'linear' && <ListLinear items={items}/>}
			{type === 'nested' && <ListNested items={items}/>}
		</>
	)
}

export default List