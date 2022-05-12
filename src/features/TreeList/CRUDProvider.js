import {createContext, useContext, useEffect, useState} from 'react'
import {first} from './First/CRUDFirst'
import {second} from './Second/CRUDSecond'
import {LinkedNestedComponentsList} from './Third/CRUDThird'


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

	const [implementation, setImplementation] = useState(2)
	const [printMethod, setPrintMethod] = useState(NESTED)

	const [choice, setChoice] = useState(getChoice())

	const [items, setItems] = useState()

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
				return LinkedNestedComponentsList
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
	}, [choice])

	const reset = () => {
		setItems(JSON.parse(JSON.stringify(choice.data)))
	}

	const getItems = () => {
		console.log('getItems() from provider')
		if (items)
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

	const getType = () => {
		return printMethod
	}

	const isMoveWithChildrenToggle = () => {
		setIsMoveWithChildren(prev => !prev)
	}

	const remove = (item) => {
		switch (choice) {
			case first:
				setItems(first.remove(items, item, isMoveWithChildren))
				break
			case second:
				// setItems(second.removeByItem(items, item))
				setItems(second.removeByIndex(items, item))
				break
		}
	}

	const addItem = () => {
		setItems(choice.add(items))
	}

	const updateTextItem = (item, newText) => {
		switch (choice) {
			case first:
				setItems(first.update(items, item, newText))
				break
			case second:
				// setItems(second.updateByItem(items, item, newText))
				setItems(second.updateByIndex(items, item, newText))
				break
		}
	}

	const toUp = (item) => {
		switch (choice) {
			case first:
				setItems(first.up(items, item, isMoveWithChildren))
				break
			case second:
				// setItems(second.upByItem(items, item))
				setItems(second.upByIndex(items, item))
				break
		}
	}

	const toDown = (item) => {
		switch (choice) {
			case first:
				setItems(choice.down(items, item, isMoveWithChildren))
				break
			case second:
				// setItems(choice.downByItem(items, item))
				setItems(second.downByIndex(items, item))
				break
		}
	}

	const toLeft = (item) => {
		switch (choice) {
			case first:
				console.log(items)
				setItems(first.left(items, item, isMoveWithChildren))
				break
			case second:
				// setItems(second.leftByItem(items, item))
				setItems(second.leftByIndex(items, item))
				break
		}
	}

	const toRight = (item) => {
		switch (choice) {
			case first:
				setItems(choice.right(items, item, isMoveWithChildren))
				break
			case second:
				// setItems(choice.rightByItem(items, item))
				setItems(choice.rightByIndex(items, item))
				break
		}
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