import React, {useEffect, useState} from 'react'
import {useNestedList} from './CRUDProvider'
import Item from './Item'
import {Fragment} from 'react'


const List = () => {

	const context = useNestedList()
	const [list, setlist] = useState([])
	const [isLinearOrNestedType, setIsLinearOrNestedType] = useState()

	useEffect(() => {
		// setlist(context.render())
		const {type, items} = context.getItems()
		setIsLinearOrNestedType(type)
		setlist(items)
		// console.clear()
		// console.log( JSON.stringify(items, null,'\t'))

	}, [context.items])

	const render = (items, indexes= []) => {


		return <>
			{items.map((item, index) => (
				<Fragment
					key={item.text} // temp
				>
					<Item
						index={[...indexes, index]}
						item={item}
					/>
					{item.child && <ul> {render(item.child, [...indexes, index])}</ul>}
				</Fragment>
			))}
		</>
	}

	return (
		<>
			{isLinearOrNestedType === 'linear' &&
				<ul>
					{list.map((item, i) => <Item key={i} item={item} index={i}/>)}
				</ul>
			}
			{isLinearOrNestedType === 'nested' &&
				<ul>
					{render(list)}
				</ul>
			}
		</>
	)
}

export default List