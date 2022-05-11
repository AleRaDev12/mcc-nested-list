import {createContext, useContext, useEffect, useState} from 'react'
import {first} from './First/CRUDFirst'
import {second} from './Second/CRUDSecond'


const CRUDContext = createContext()

export const useNestedList = () => {
	return useContext(CRUDContext)
}

export const CRUDProvider = ({children}) => {

	const [items, setItems] = useState([])
	const [isMoveWithChildren, setIsMoveWithChildren] = useState(true)
	const [implementation, setImplementation] = useState(1)

	const toChoice = () => {
		switch (implementation) {
			case 1:
				return first
				break
			case 2:
				return second
				setIsMoveWithChildren(true)
				break
		}
	}

	const [choice, setChoice] = useState(toChoice())

	useEffect(() => {
		switch (implementation) {
			case 1:
				setChoice(toChoice())
				break
			case 2:
				setChoice(toChoice())
				setIsMoveWithChildren(true)
				break
		}
	}, [implementation])

	useEffect(() => {
		reset()
	}, [choice])

	const render = () => {
		return choice.render(items)
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

	const addItem = (index = null) => {
		setItems(choice.add(items, index))
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