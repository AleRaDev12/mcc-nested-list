import {createContext, useContext, useEffect, useState} from 'react'
import {first} from './Handlers/HandlersLinear'
import {second} from './Handlers/HandlersNested'
import {third} from './Handlers/HandlersLinked'


const CRUDContext = createContext()

export const useNestedList = () => {
	return useContext(CRUDContext)
}

export const CRUDProvider = ({children}) => {

	const [isMoveWithChildren, setIsMoveWithChildren] = useState(true)

	const [implementation, setImplementation] = useState(1)
	const [printMethod, setPrintMethod] = useState(1)

	const [dataSet, setDataSet] = useState()

	const [items, setItems] = useState()

	// Для вывода исходных данных в UI
	const [defaultData, setDefaultData] = useState()

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

	const getItemsForPrint = () => {
		if (items) {
			switch (printMethod) {
				case 1: {
					return dataSet.getItemsForPrintLinear(items)
				}
				case 2:
					return dataSet.getItemsForPrintNested(items)
				default:
					return null
			}
		}
	}

	const isMoveWithChildrenToggle = () => {
		setIsMoveWithChildren(prev => !prev)
	}

	const remove = (item) => {
		setItems(dataSet.remove(items, item, isMoveWithChildren))
	}

	const addItem = (targetItem = null) => {
		setItems(dataSet.add(items, targetItem))
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
			getItemsForPrint,
			printMethod,
			setPrintMethod,
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