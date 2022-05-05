import React from 'react'
import Item from './Item'
import {useNonNestedComponentsList} from './ItemContext'


const List = () => {

	const {items} = useNonNestedComponentsList()

	return (
		<>
			{items.map((item, i) => <Item key={i} text={item.text} level={item.level} i={i}/>)}
		</>
	)
}

export default List