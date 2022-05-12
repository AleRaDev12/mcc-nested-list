import React, {useEffect} from 'react'
import {useNestedList} from './CRUDProvider'
import ListLinear from './ListLinear'
import ListNested from './ListNested'


const List = () => {

	const context = useNestedList()

	console.log('getItems() and type from List')
	useEffect(() => {

	})
	const items = context.getItems()
	const type = context.getType()
	console.log('Получил тип и список элементов', type, items)

	return (
		<>
			{type === 'linear' && <ListLinear items={items}/>}
			{type === 'nested' && <ListNested items={items}/>}
		</>
	)
}

export default List