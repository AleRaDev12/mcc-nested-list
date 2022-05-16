import React from 'react'
import Item from '../Item/Item'


const ListLinear = ({items}) => {

	console.log('linear', items)

	return (
		<>
			<ul>
				{items && items.map(item => <Item
					key={item.id ?? item.index}
					item={item}
					style={item.level && {marginLeft: (item.level - 1) * 1.75 + 'em'}}
				/>)}
			</ul>
		</>
	)
}

export default ListLinear