import React, { useEffect } from 'react'
import { useNestedList } from './CRUDProvider'

var classNames = require('classnames');

const ChangeViewButtons = () => {

    const {implementation, setImplementation} = useNestedList()

    const changeImplementation = (i) => {
		setImplementation(i)
	}

    return (
        <>
            <button
                onClick={e => changeImplementation(1)}
                className={classNames({ 'bg-gray-700': implementation === 1 }, "bg-gray-900", "hover:bg-gray-700 text-sm text-gray-100 font-bold py-2 px-8 rounded-l transition ease-in")}

            >
                Первый вариант
            </button>
            <button
                onClick={e => changeImplementation(2)}
                className={classNames({ 'bg-gray-700': implementation === 2 }, "bg-gray-900", "hover:bg-gray-700 text-sm text-gray-100 font-bold py-2 px-8  transition ease-in")}
            >
                Второй вариант
            </button>
            <button
                className="bg-gray-900 text-sm text-gray-500 opacity-50 font-bold py-2 px-8 rounded-r transition ease-in cursor-not-allowed"
            >
                Третий вариант (не готов)
            </button>
        </>
    )
}

export default ChangeViewButtons