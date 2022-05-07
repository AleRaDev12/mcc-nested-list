import React, {useEffect, useState} from 'react'
import {useFullNestedComponentsList} from './ItemContext'
import Item from './Item'


const List = () => {

	const {items} = useFullNestedComponentsList()
	const [list, setlist] = useState([])

	const render = (items) => {
		return <>
			{items.map(item => <>
				<Item
					key={Math.random()}
					item={item}
				/>
				{item.child && <ul> {render(item.child)}</ul>}
			</>)}
		</>
	}

	useEffect(() => {
		setlist(render(items))
	}, [items])

	return (
		<>
			<ul>{list}</ul>
		</>
	)
}

export default List


