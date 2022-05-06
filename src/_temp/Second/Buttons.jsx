import React from 'react'
import {useFullNestedComponentsList} from './ItemContext'


const Buttons = () => {

	const items = useFullNestedComponentsList()

	return (
		<div className={'treeList--buttons'}>
			<button
				onClick={items.crud.add}
			>
				Add item
			</button>
			<button
				onClick={items.crud.reset}
			>
				Reset to mock data
			</button>
		</div>
	)
}

export default Buttons