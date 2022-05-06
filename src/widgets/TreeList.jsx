import React from 'react'
import Buttons from '../_temp/First/Buttons'
import ToggleChildrenMoving from '../_temp/First/ToggleChildrenMoving'
import List from '../_temp/First/List'
import {CRUDProvider} from '../_temp/First/ItemContext'
import styles from './TreeList.module.scss'

const TreeList = () => {
	return (
		<CRUDProvider>
			<div
				// className={styles.treeList}
			>
				<Buttons/>
				<ToggleChildrenMoving/>
				<List/>
			</div>
		</CRUDProvider>
	)
}

export default TreeList