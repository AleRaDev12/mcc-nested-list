import React from 'react'
import {useNestedList} from '../../model/CRUDProvider'
import ListLinear from './ListLinear'
import ListNested from './ListNested'


const List = () => {

	const context = useNestedList()
	const items = context.getItemsForPrint()

	return (
		<>
			{context.printMethod === 1 && <ListLinear items={items}/>}
			{context.printMethod === 2 && <ListNested items={items}/>}
		</>
	)
}

export default List