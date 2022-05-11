import {createContext, useContext, useEffect, useState} from 'react'
import {first} from './First/CRUDFirst'
import {second} from './Second/CRUDSecond'
import {LinkedNestedComponentsList} from './Third/CRUDThird'


const CRUDContext = createContext()

export const useNestedList = () => {
	return useContext(CRUDContext)
}

export const CRUDProvider = ({children}) => {

	const LINEAR = 'linear'
	const NESTED = 'nested'

	const [items, setItems] = useState([])
	const [isMoveWithChildren, setIsMoveWithChildren] = useState(true)
	const [implementation, setImplementation] = useState(1)
	const [printMethod, setPrintMethod] = useState(NESTED)

	const toChoice = () => {
		switch (implementation) {
			case 1:
				return first
			case 2:
				setIsMoveWithChildren(true)
				return second
			case 3:
				return LinkedNestedComponentsList
			default:
				return null
		}
	}

	const [choice, setChoice] = useState(toChoice())

	useEffect(() => {

		setChoice(toChoice())
		if (implementation === 2)
			setIsMoveWithChildren(true)

	}, [implementation])

	useEffect(() => {
		reset()
	}, [choice])

	const render = () => {
		return choice.render(items)
	}

	const getItems = () => {
		switch (printMethod) {
			case LINEAR: {
				return {type: LINEAR, items: first.getItemsForPrintLinear(items)}
			}
			case NESTED:
				return {type: NESTED, items: first.getItemsForPrintNested(items)}
			default:
				return null
		}
	}

	const isMoveWithChildrenToggle = () => {
		setIsMoveWithChildren(prev => !prev)
	}

	const deleteItem = (item, index) => {
		switch (choice) {
			case first:
				setItems(first.remove(items, index, isMoveWithChildren))
				break
			case second:
				// setItems(second.removeByItem(items, item))
				setItems(second.removeByIndex(items, index))
				break
		}
	}

	const addItem = () => {
		setItems(choice.add(items))
	}

	const updateTextItem = (item, index, newText) => {

		switch (choice) {
			case first:
				setItems(first.update(items, index, newText))
				break
			case second:
				// setItems(second.updateByItem(items, item, newText))
				setItems(second.updateByIndex(items, index, newText))
				break
		}
	}

	const toUp = (item, index) => {
		switch (choice) {
			case first:
				setItems(first.up(index, isMoveWithChildren, items))
				break
			case second:
				// setItems(second.upByItem(items, item))
				setItems(second.upByIndex(items, index))
				break
		}
	}

	const toDown = (item, index) => {
		switch (choice) {
			case first:
				setItems(choice.down(index, isMoveWithChildren, items))
				break
			case second:
				// setItems(choice.downByItem(items, item))
				setItems(second.downByIndex(items, index))
				break
		}
	}

	const toLeft = (item, index) => {

		switch (choice) {
			case first:
				setItems(first.left(index, isMoveWithChildren, items))
				break
			case second:
				// setItems(second.leftByItem(items, item))
				setItems(second.leftByIndex(items, index))
				break
		}
	}

	const toRight = (item, index) => {
		switch (choice) {
			case first:
				setItems(choice.right(index, isMoveWithChildren, items))
				break
			case second:
				// setItems(choice.rightByItem(items, item))
				setItems(choice.rightByIndex(items, index))
				break
		}
	}

	const reset = () => {
		setItems(JSON.parse(JSON.stringify(choice.data)))
	}

	return (
		<CRUDContext.Provider value={{
			items,
			implementation,
			setImplementation,

			render,
			getItems,
			crud: {
				delete: deleteItem,
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