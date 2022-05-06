import React, {useEffect, useState} from 'react'
import {useFullNestedComponentsList} from './ItemContext'
import Item from './Item'


const List = () => {

	const {items} = useFullNestedComponentsList()
	const [list, setlist] = useState([])

	const renderChild = (item) => {
		return item.map(node => <>
			<Item item={node}/>
			{node.child && <ul> {renderChild(node.child)}</ul>}
		</>)
	}

	useEffect(() => {
		setlist(renderChild(items))
	}, [items])

	return (
		<>
			<ul>{list}</ul>
		</>
	)
}

export default List


