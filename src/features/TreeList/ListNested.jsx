import React from 'react'


const ListNested = ({items}) => {

	const render = (items, indexes = []) => {
		console.log(items, indexes)
		/*return <>
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
		</>*/
	}

	return (
		<ul>
			1
			{/*{render(items)}*/}
		</ul>
	)
}

export default ListNested