import {createContext, useContext, useEffect, useState} from 'react'
import {NonNestedComponentsListData} from './data-mock'
import {moveInArray} from '../utils'


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

		let countWithChild = 1

		if (isMoveWithChildren) {
			// определить количество элементов текущего уровня
			for (let j = i + 1; j < items.length; j++) {
				if (items[j].level > items[i].level)
					countWithChild++
				if (items[j].level === items[i].level)
					break
			}
		}

		setItems([...items.slice(0, i), ...items.slice(i + countWithChild, items.length)])
	}

	const addItem = () => {
		setItems([...items, {text: 'Empty item', level: items.at(-1)?.level ?? 1}])
	}

	const updateTextItem = (i, newText) => {
		items[i].text = newText
		setItems([...items])
	}

	const toUp = (i) => {

		if (i === 0) {
			console.log('Выше некуда')
			return
		}

		let countWithChild = 1
		let to = i - 1

		if (isMoveWithChildren) {
			// определить количество элементов текущего уровня
			for (let j = i + 1; j < items.length; j++) {
				if (items[j].level > items[i].level)
					countWithChild++
				if (items[j].level === items[i].level)
					break
			}

			// найти точку для вставки (после элемента такого же уровня или на внешний уровень)
			if (items[i - 1].level === items[i].level)
				to = i - 1
			else if (items[i - 1].level < items[i].level) {
				for (let j = i; j < i + countWithChild; j++) {
					items[j].level--
				}
			} else {
				for (let j = i - 1; j >= 0; j--) {
					if (items[j].level === items[i].level) {
						to = j
						break
					}
				}
			}
		}

		setItems([...moveInArray(items, i, to, countWithChild)])

	}

	const toDown = (i) => {

		if (i + 1 === items.length) {
			console.log('Ниже некуда')
			return
		}

		let countWithChild = 1
		let countNextWithChild = 1
		let to = i - 1

		if (isMoveWithChildren) {
			// определить количество элементов текущего элемента с его наследниками
			for (let j = i + 1; j < items.length; j++) {
				if (items[j].level > items[i].level)
					countWithChild++
				if (items[j].level === items[i].level)
					break
			}

			if (i + countWithChild >= items.length) {
				console.log('Ниже некуда 2')
				return
			}

			// определить количество элементов следующего элемента с его наследниками
			for (let j = i + countWithChild + 1; j < items.length; j++) {
				if (items[j].level > items[i + countWithChild].level)
					countNextWithChild++
				if (items[j].level === items[i].level)
					break
			}

			// найти точку для вставки (после элемента такого же уровня или на внешний уровень)
			if (items[i + countWithChild].level === items[i].level)
				to = i + countWithChild
			else if (items[i + countWithChild].level < items[i].level) {
				for (let j = i; j < i + countWithChild; j++) {
					items[j].level--
				}
			} else {
				for (let j = i - 1; j >= 0; j--) {
					if (items[j].level === items[i].level) {
						to = j
						break
					}
				}
			}

		}

		setItems([...moveInArray(items, i, i + countWithChild, countWithChild, countNextWithChild)])
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