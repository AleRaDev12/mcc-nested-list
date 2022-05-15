import {createContext, useContext, useEffect, useState} from 'react'
import {first} from './First/CRUDFirst'
import {second} from './Second/CRUDSecond'
import {third} from './Third/CRUDThird'


const CRUDContext = createContext()

export const useNestedList = () => {
	return useContext(CRUDContext)
}

export const CRUDProvider2 = ({children}) => {
	return (
		<CRUDContext.Provider value={{
			items: () => null,
			implementation: () => null,
			setImplementation: () => null,
			getItems: () => null,
			togglePrintMethod: () => null,
			getType: () => null,
			crud: {
				remove: () => null,
				add: () => null,
				update: () => null,
				toUp: () => null,
				toDown: () => null,
				toLeft: () => null,
				toRight: () => null,
				reset: () => null,
			},
			options: {
				isMoveWithChildren: () => null,
				isMoveWithChildrenToggle: () => null,
			},
		}}>
			{children}
		</CRUDContext.Provider>
	)
}

export const CRUDProvider = ({children}) => {

	const LINEAR = 'linear'
	const NESTED = 'nested'

	const [isMoveWithChildren, setIsMoveWithChildren] = useState(true)

	const [implementation, setImplementation] = useState(2)
	const [printMethod, setPrintMethod] = useState(LINEAR)

	const [dataSet, setDataSet] = useState()

	const [items, setItems] = useState()

	// Для вывода исходных данных в UI
	const [defaultData, setDefaultData] = useState()

	const togglePrintMethod = () => {

		switch (printMethod) {
			case LINEAR: {
				setPrintMethod(NESTED)
				break
			}
			case NESTED:
				setPrintMethod(LINEAR)
				break
			default:
				return null
		}
	}

	function getDataSet() {
		switch (implementation) {
			case 1:
				return first
			case 2:
				return second
			case 3:
				return third
			default:
				return null
		}
	}

	useEffect(() => {
		setItems(null)
		setDataSet(getDataSet())
		if (dataSet === second)
			setIsMoveWithChildren(true)
	}, [implementation])

	useEffect(() => {
		if (dataSet) {
			reset()
			setDefaultData(dataSet.data)
		}
	}, [dataSet])

	const reset = () => {
		setItems(JSON.parse(JSON.stringify(dataSet.data)))
	}

	const getItems = () => {
		if (items) {
			switch (printMethod) {
				case LINEAR: {
					return dataSet.getItemsForPrintLinear(items)
				}
				case NESTED:
					return dataSet.getItemsForPrintNested(items)
				default:
					return null
			}
		}
	}

	const getType = () => {
		return printMethod
	}

	const isMoveWithChildrenToggle = () => {
		setIsMoveWithChildren(prev => !prev)
	}

	const remove = (item) => {
		setItems(dataSet.remove(items, item, isMoveWithChildren))
	}

	const addItem = (index = null) => {
		setItems(dataSet.add(items, index))
	}

	const updateTextItem = (item, newText) => {
		setItems(dataSet.update(items, item, newText))
	}

	const toUp = (item) => {
		setItems(dataSet.up(items, item, isMoveWithChildren))
	}

	const toDown = (item) => {

		setItems(dataSet.down(items, item, isMoveWithChildren))

	}

	const toLeft = (item) => {
		setItems(dataSet.left(items, item, isMoveWithChildren))
	}

	const toRight = (item) => {
		setItems(dataSet.right(items, item, isMoveWithChildren))
	}

	return (
		<CRUDContext.Provider value={{
			items,
			implementation,
			setImplementation,
			getItems,
			togglePrintMethod,
			getType,
			defaultData,
			crud: {
				remove,
				add: addItem,
				update: updateTextItem,
				toUp,
				toDown,
				toLeft,
				toRight,
				reset,
			},
			options: {
				isMoveWithChildren,
				isMoveWithChildrenToggle,
			},
		}}>
			{children}
		</CRUDContext.Provider>
	)
}