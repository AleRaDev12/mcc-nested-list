import React from 'react'
import List from './List'
import {CRUDProvider} from './CRUDProvider'
import ActionButtons from './ActionButtons'
import ChangeViewButtons from './ChangeViewButtons'
import styles from './TreeList.module.scss'
import ToggleChildrenMoving from "./ToggleChildrenMoving";

const TreeList = () => {
	return (
		<CRUDProvider>
			<div
				className={styles.treeList}
			>
				<ChangeViewButtons />
				<ActionButtons/>
				<ToggleChildrenMoving/>
				<List/>
			</div>
		</CRUDProvider>
	)
}

export default TreeList