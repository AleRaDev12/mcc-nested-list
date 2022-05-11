import React from 'react'
import Item from './Item'


const ListLinear = ({items}) => {

	return (
		<ul>
			{items.map((item, i) => <Item
				key={i}
				item={item}
				index={i}
				style={item.level && {marginLeft: (item.level - 1) * 1.75 + 'em'}}
			/>)}
		</ul>
	)
}

export default ListLinear