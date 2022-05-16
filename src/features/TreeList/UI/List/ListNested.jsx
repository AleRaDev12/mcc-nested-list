import React, {Fragment} from 'react'
import Item from '../Item/Item'


const ListNested = ({items}) => {

	console.log('nested', items)

	const render = (items) => {
		// temp change map to diff type iterable func
		return <>
			{items && items.map(item => (
				<Fragment
					key={item.text + item.index + item.id ?? ''} // temp
				>
					<Item
						item={item}
					/>
					{item.child && item.child.length !== 0 && <ul> {render(item.child)}</ul>}
				</Fragment>
			))}
		</>
	}

	return (
		<>
			<ul>
				{render(items)}
			</ul>
		</>
	)
}

export default ListNested