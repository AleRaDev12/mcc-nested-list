import React from 'react'
import {CRUDProvider} from './ItemContext'
import List from './List'
import Buttons from './Buttons'


const FullNestedComponentsList = () => {

	return (
		<CRUDProvider>
			<div className="treeList">
				<Buttons/>
				<List/>
			</div>
		</CRUDProvider>
	)
}

export default FullNestedComponentsList