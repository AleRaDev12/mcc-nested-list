import React from 'react'
import {useNestedList} from '../../model/CRUDProvider'
import styles from './ChangeViewButtons.module.scss'


const classNames = require('classnames')

const ChangeViewButtons = () => {

	const {implementation, setImplementation, printMethod, setPrintMethod} = useNestedList()

	const changeImplementation = (i) => {
		setImplementation(i)
	}

	const changeViewType = (i) => {
		setPrintMethod(i)
	}

	return (
		<div className={styles.ChangeViewButtons}>
			<div className="inline-flex justify-center w-full mb-2 child:grow">
				<button
					onClick={e => changeImplementation(1)}
					className={classNames({'!bg-gray-600': implementation === 1})}
				>
					First - linear
				</button>
				<button
					onClick={e => changeImplementation(2)}
					className={classNames({'!bg-gray-600': implementation === 2})}
				>
					Second - nested
				</button>
				<button
					onClick={e => changeImplementation(3)}
					className={classNames({'!bg-gray-600': implementation === 3})}
				>
					Third - linked
				</button>
			</div>

			<div className="inline-flex justify-center w-full mb-5 child:grow">
				<button
					onClick={e => changeViewType(1)}
					className={classNames({'!bg-gray-600': printMethod === 1}, 'w-1/2')}
				>
					Unnested view <br/>
					<span className="font-normal">one level unnested blocks, inline margin style</span>
				</button>

				<button
					onClick={e => changeViewType(2)}
					className={classNames({'!bg-gray-600': printMethod === 2}, 'w-1/2')}
				>
					Nested view <br/>
					<span className="font-normal">nested ul</span>
				</button>
			</div>
		</div>
	)
}

export default ChangeViewButtons