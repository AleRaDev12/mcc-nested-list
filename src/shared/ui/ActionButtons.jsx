import React from 'react'
import styles from './ActionButtons.module.scss'


const ActionButtons = ({context}) => {

	const items = context()

	return (
		<div className={styles.buttons}>
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

export default ActionButtons