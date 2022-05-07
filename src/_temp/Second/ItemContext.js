import { createContext, useContext, useEffect, useState } from 'react'
import { FullNestedComponentsListData } from './data-mock'
import { second } from '../../new/CRUD'

const CRUDContext = createContext()

export const useFullNestedComponentsList = () => {
	return useContext(CRUDContext)
}

export const CRUDProvider = ({ children }) => {

	const [items, setItems] = useState([])

	useEffect(() => {
		reset()
	}, [])

	const deleteItem = (item) => {
		setItems(second.remove(items, item))
	}

	const addItem = () => {
		setItems()
	}

	const updateTextItem = (item, newText) => {
		setItems(second.update(items, item, newText))
	}

	const toUp = (item) => {
		setItems(second.up(items, item))
	}

	const toDown = (item) => {
		setItems(second.down(items, item))
	}

	const toLeft = (item) => {
		setItems(second.left(items, item))
	}

	const toRight = (item) => {
		setItems(second.right(items, item))
	}

	const reset = () => {
		setItems(JSON.parse(JSON.stringify(FullNestedComponentsListData)))
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
		}}>
			{children}
		</CRUDContext.Provider>
	)
}