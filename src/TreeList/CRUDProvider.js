import {createContext, useContext, useEffect, useState} from 'react'
import {first, second} from './CRUD'


const CRUDContext = createContext()

export const useNestedList = () => {
	return useContext(CRUDContext)
}

export const CRUDProvider = ({children}) => {

	const [items, setItems] = useState([])
	const [isMoveWithChildren, setIsMoveWithChildren] = useState(true)
	const [implementation, setImplementation] = useState(1)
	const [choice, setChoice] = useState(first)

	useEffect(() => {
		switch (implementation) {
			case 1:
				setChoice(first)
				break
			case 2:
				setChoice(second)
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

	const deleteItem = (item, i) => {
		switch (choice) {
			case first:
				setItems(choice.remove(items, i, isMoveWithChildren))
				break
			case second:
				setItems(choice.remove(items, item))
				break
		}
	}

	const addItem = () => {
		setItems(choice.add(items))
	}

	const updateTextItem = (item, i, newText) => {

		switch (choice) {
			case first:
				setItems(choice.update(items, i, newText))
				break
			case second:
				setItems(choice.update(items, item, newText))
				break
		}
	}

	const toUp = (item, i) => {

		switch (choice) {
			case first:
				setItems(choice.up(i, isMoveWithChildren, items))
				break
			case second:
				setItems(choice.remove(items, item))
				break
		}
	}

	const toDown = (item, i) => {

		switch (choice) {
			case first:
				setItems(choice.down(i, isMoveWithChildren, items))
				break
			case second:
				setItems(choice.down(items, item))
				break
		}
	}

	const toLeft = (item, i) => {

		switch (choice) {
			case first:
				setItems(choice.left(i, isMoveWithChildren, items))
				break
			case second:
				setItems(choice.left(items, item))
				break
		}
	}

	const toRight = (item, i) => {
		switch (choice) {
			case first:
				setItems(choice.right(i, isMoveWithChildren, items))
				break
			case second:
				setItems(choice.right(items, item))
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