import React, { useEffect } from 'react'
import { useNestedList } from './CRUDProvider'

var classNames = require('classnames');

const ChangeViewButtons = () => {

    const {implementation, setImplementation} = useNestedList()

    const changeImplementation = (i) => {
		setImplementation(i)
	}

    return (
        <div className="inline-flex justify-center w-full pb-5">
            <button
                onClick={e => changeImplementation(1)}
                className={classNames({ 'bg-gray-700': implementation === 1 }, "bg-gray-900", "hover:bg-gray-700 text-xs text-gray-100 font-bold py-2 px-4 rounded-l transition ease-in")}

            >
                Первый вариант
            </button>
            <button
                onClick={e => changeImplementation(2)}
                className={classNames({ 'bg-gray-700': implementation === 2 }, "bg-gray-900", "hover:bg-gray-700 text-xs text-gray-100 font-bold py-2 px-4  transition ease-in")}
            >
                Второй вариант
            </button>
            <button
                className="bg-gray-900 text-xs text-gray-500 opacity-50 font-bold py-2 px-4 rounded-r transition ease-in cursor-wait"
            >
                Третий вариант (не готов)
            </button>
        </div>
    )
}

export default ChangeViewButtons