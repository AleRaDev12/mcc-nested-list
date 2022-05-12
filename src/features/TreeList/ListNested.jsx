import React, {Fragment} from 'react'
import Item from './Item'


const ListNested = ({items}) => {

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
					{item.child && <ul> {render(item.child)}</ul>}
				</Fragment>
			))}
		</>
	}

	return (
		<>
			nested list
			<ul>
				{render(items)}
			</ul>
		</>
	)
}

export default ListNested