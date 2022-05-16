import React from 'react'
import {useNestedList} from '../../model/CRUDProvider'
import ListLinear from './ListLinear'
import ListNested from './ListNested'


const List = () => {

	const context = useNestedList()

	// useEffect(() => {
	// 	console.log('useffect from list', context.itemsForPrint)
	// }, [context.itemsForPrint])

	return (
		<>
			{context.printMethod === 1 && <ListLinear items={context.itemsForPrint}/>}
			{context.printMethod === 2 && <ListNested items={context.itemsForPrint}/>}
		</>
	)
}

export default List