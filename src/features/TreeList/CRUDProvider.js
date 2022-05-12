import {createContext, useContext, useEffect, useState} from 'react'
import {first} from './First/CRUDFirst'
import {second} from './Second/CRUDSecond'
import {third} from './Third/CRUDThird'


const CRUDContext = createContext()

export const useNestedList = () => {
	return useContext(CRUDContext)
}

export const CRUDProvider2 = ({children}) => {
	console.log('--------- CRUDProvider render ---------')
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
	console.log(' ')
	console.log(' ')
	console.log('--------- CRUDProvider main init ---------')

	const LINEAR = 'linear'
	const NESTED = 'nested'

	const [isMoveWithChildren, setIsMoveWithChildren] = useState(true)

	const [implementation, setImplementation] = useState(3)
	const [printMethod, setPrintMethod] = useState(NESTED)

	const [choice, setChoice] = useState(getChoice())

	const [items, setItems] = useState()

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

	function getChoice() {
		console.log('getChoice() from provider, implementation = ', implementation)
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
		console.log(' ')
		console.log('--------- CRUDProvider main render ---------')
	}, [])

	useEffect(() => {
		console.log('--- useEffect from provider when [implementation] = ', implementation)
		setChoice(getChoice())
		if (choice === second)
			setIsMoveWithChildren(true)
	}, [implementation])

	useEffect(() => {
		console.log('--- useEffect from provider when [choice] = ', choice)
		if (choice) reset()
		setDefaultData(choice.data)
	}, [choice])

	const reset = () => {
		setItems(JSON.parse(JSON.stringify(choice.data)))
	}

	const getItems = () => {
		console.log('getItems() from provider')
		if (items) {
			switch (printMethod) {
				case LINEAR: {
					return choice.getItemsForPrintLinear(items)
				}
				case NESTED:
					return choice.getItemsForPrintNested(items)
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
		setItems(choice.remove(items, item, isMoveWithChildren))
	}

	const addItem = () => {
		setItems(choice.add(items))
	}

	const updateTextItem = (item, newText) => {
		setItems(choice.update(items, item, newText))
	}

	const toUp = (item) => {
		setItems(choice.up(items, item, isMoveWithChildren))
	}

	const toDown = (item) => {

		setItems(choice.down(items, item, isMoveWithChildren))

	}

	const toLeft = (item) => {
		setItems(choice.left(items, item, isMoveWithChildren))
	}

	const toRight = (item) => {
		setItems(choice.right(items, item, isMoveWithChildren))
	}

	console.log(' ')
	console.log(' ')

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