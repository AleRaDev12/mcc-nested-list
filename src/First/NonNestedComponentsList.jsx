import React from 'react'
import {CRUDProvider} from './ItemContext'
import List from './List'
import Buttons from './Buttons'
import ToggleChildrenMoving from './ToggleChildrenMoving'


const NonNestedComponentsList = () => {

	return (
		<CRUDProvider>
			<div className="treeList">
				<Buttons/>
				<ToggleChildrenMoving/>
				<List/>
			</div>
		</CRUDProvider>
	)
}

export default NonNestedComponentsList