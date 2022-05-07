import React, {useEffect, useState} from 'react'
import {useNonNestedComponentsList} from './ItemContext'
import Item from './Item'


const List = () => {

	const {items} = useNonNestedComponentsList()
	const [list, setlist] = useState([])

	const render = (items) => {
		return <>
			{items.map((item, i) => <Item
				key={i} //temp
				item={item}
				i={i}
			/>)}
		</>
	}

	useEffect(() => {
		setlist(render(items))
	}, [items])

	return (
		<>
			{list}
		</>
	)
}

export default List