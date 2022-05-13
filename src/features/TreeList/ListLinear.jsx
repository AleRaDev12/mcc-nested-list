import React from 'react'
import Item from './Item'


const ListLinear = ({items}) => {

	return (
		<>
			linear view
			<ul>
				{items && items.map(item => <Item
					key={item.index}
					item={item}
					style={item.level && {marginLeft: (item.level - 1) * 1.75 + 'em'}}
				/>)}
			</ul>
		</>
	)
}

export default ListLinear