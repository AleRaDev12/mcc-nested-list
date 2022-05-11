import React from 'react'
import styles from './ActionButtons.module.scss'
import {useNestedList} from './CRUDProvider'


const ActionButtons = () => {

	const context = useNestedList()

	return (
		<div className={styles.buttons}>
			<button
				onClick={context.crud.add}
			>
				+ Add item
			</button>
			<button
				onClick={context.crud.reset}
			>
				Reset to mock data
			</button>
			
			<button
				onClick={context.togglePrintMethod}
			>
				Change type
			</button>
		</div>
	)
}

export default ActionButtons