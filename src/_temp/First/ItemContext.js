import {createContext, useContext, useEffect, useState} from 'react'
import {NonNestedComponentsListData} from './data-mock'
import {deleteItemsFromArray, moveInArray} from '../../shared/utils/utils'
import {addFirst, deleteFirst, first} from '../../CRUD-first'


const CRUDContext = createContext()

export const useNonNestedComponentsList = () => {
	return useContext(CRUDContext)
}

export const CRUDProvider = ({children}) => {

	const [items, setItems] = useState([])
	const [isMoveWithChildren, setIsMoveWithChildren] = useState(true)

	useEffect(() => {
		reset()
	}, [])

	const isMoveWithChildrenToggle = () => {
		setIsMoveWithChildren(prev => !prev)
	}

	const deleteItem = (i) => {
		setItems(first.deleteItem(i, isMoveWithChildren, items))
	}

	const addItem = () => {
		setItems(first.add(items))
	}

	const updateTextItem = (i, newText) => {
		setItems(first.update(i, newText,items))
	}

	const toUp = (i) => {
		setItems(first.up(i, isMoveWithChildren, items))
	}

	const toDown = (i) => {
		setItems(first.down(i, isMoveWithChildren, items))
	}

	const toLeft = (i) => {
		if (items[i].level > 1) {
			items[i].level--

			if (isMoveWithChildren) {
				const startLevel = items[i].level + 1
				for (let j = i + 1; j < items.length; j++) {
					if (items[j].level > startLevel) {
						items[j].level--
					} else break
				}
			}
		}

		setItems([...items])
	}

	const toRight = (i) => {
		if (i === 0) {
			console.log('Перемещение невозможно (нет родительского элемента сверху)')
			return
		}
		if (items[i - 1].level >= items[i].level) {
			items[i].level++

			if (isMoveWithChildren) {
				const startLevel = items[i].level - 1
				for (let j = i + 1; j < items.length; j++) {
					if (items[j].level > startLevel) {
						items[j].level++
					} else break
				}
			}
		}

		setItems([...items])
	}

	const reset = () => {
		setItems(JSON.parse(JSON.stringify(NonNestedComponentsListData)))
		console.log(JSON.stringify(NonNestedComponentsListData))
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