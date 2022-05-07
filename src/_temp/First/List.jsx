import React from 'react'
import Item from './Item'
import {useNonNestedComponentsList} from './ItemContext'
import {useEffect, useState} from 'react'


const List = () => {

	const {items} = useNonNestedComponentsList()
	const [list, setlist] = useState([])

	const renderChild = (items) => {
		return <>
			{items.map((item, i) => <Item
				key={i} //temp
				item={item}
				i={i}
			/>)}
		</>
	}

	useEffect(() => {
		setlist(renderChild(items))
	}, [items])

	return (
		<>
			{items.map((item, i) => <Item
				key={i} //temp
				item={item}
				i={i}
			/>)
			}
		</>
	)
}

export default List