import { createContext, useContext, useEffect, useState } from 'react'
import { NonNestedComponentsListData } from './data-mock'
import { first } from '../../new/CRUD'

const CRUDContext = createContext()

export const useNonNestedComponentsList = () => {
	return useContext(CRUDContext)
}

export const CRUDProvider = ({ children }) => {

	const [items, setItems] = useState([])
	const [isMoveWithChildren, setIsMoveWithChildren] = useState(true)

	useEffect(() => {
		reset()
	}, [])

	const isMoveWithChildrenToggle = () => {
		setIsMoveWithChildren(prev => !prev)
	}

	const deleteItem = (i) => {
		setItems(first.remove(i, isMoveWithChildren, items))
	}

	const addItem = () => {
		setItems(first.add(items))
	}

	const updateTextItem = (i, newText) => {
		setItems(first.update(i, newText, items))
	}

	const toUp = (i) => {
		setItems(first.up(i, isMoveWithChildren, items))
	}

	const toDown = (i) => {
		setItems(first.down(i, isMoveWithChildren, items))
	}

	const toLeft = (i) => {
		setItems(first.left(i, isMoveWithChildren, items))
	}

	const toRight = (i) => {
		setItems(first.right(i, isMoveWithChildren, items))
	}

	const reset = () => {
		setItems(JSON.parse(JSON.stringify(NonNestedComponentsListData)))
	}

	return (
		<CRUDContext.Provider value={{
			items: items,
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