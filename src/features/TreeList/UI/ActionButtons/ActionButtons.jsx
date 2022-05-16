import React from 'react'
import styles from './ActionButtons.module.scss'
import {useNestedList} from '../../model/CRUDProvider'


const ActionButtons = () => {

	const context = useNestedList()

	return (
		<div className={styles.buttons}>
			<button
				onClick={e => context.crud.add(null)}
			>
				+ Add item
			</button>

			<button
				onClick={context.crud.reset}
			>
				↺ Reset to mock data
			</button>
		</div>
	)
}

export default ActionButtons