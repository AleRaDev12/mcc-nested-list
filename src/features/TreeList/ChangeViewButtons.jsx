import React from 'react'
import {useNestedList} from './CRUDProvider'


const classNames = require('classnames')

const ChangeViewButtons = () => {

	const {implementation, setImplementation} = useNestedList()

	const changeImplementation = (i) => {
		setImplementation(i)
	}

	return (
		<>
			<button
				onClick={e => changeImplementation(1)}
				className={classNames('bg-gray-900', {'bg-gray-600': implementation === 1}, 'hover:bg-gray-700 text-xs sm:text-sm text-gray-100 font-bold py-2 px-3 rounded-l transition ease-in')}
			>
				Первый вариант
			</button>
			<button
				onClick={e => changeImplementation(2)}
				className={classNames('bg-gray-900', {'bg-gray-600': implementation === 2}, 'hover:bg-gray-700 text-xs sm:text-sm text-gray-100 font-bold py-2 px-3  transition ease-in')}
			>
				Второй вариант
			</button>
			<button
				onClick={e => changeImplementation(3)}
				className={classNames('bg-gray-900', {'bg-gray-600': implementation === 3}, 'hover:bg-gray-700 text-xs sm:text-sm text-gray-100 font-bold py-2 px-3 rounded-r  transition ease-in')}
			>
				Третий вариант
			</button>
		</>
	)
}

export default ChangeViewButtons