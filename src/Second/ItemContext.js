import {createContext, useContext, useEffect, useState} from 'react'
import {FullNestedComponentsListData} from './data-mock'
import {moveInArray} from '../utils'


const CRUDContext = createContext()

export const useFullNestedComponentsList = () => {
	return useContext(CRUDContext)
}

export const CRUDProvider = ({children}) => {

	const [items, setItems] = useState([])

	useEffect(() => {
		reset()
	}, [])

	// Рекурсивный поиск и удаление элемента
	const deleteFilterRecursive = (arr, itemForDel) => {
		return arr.filter((item) => {
			if (item !== itemForDel) {
				if (!item.child) {
					return item
				} else {
					item.child = deleteFilterRecursive(item.child, itemForDel)
					return item
				}
			}
		})
	}

	const deleteItem = (item) => {
		setItems([...deleteFilterRecursive(items, item)])
	}

	const addItem = () => {
		setItems([...items, {id: Math.trunc(Math.random() * 10000), text: 'Empty item'}])
	}

	const updateTextItem = (item, newText) => {
		item.text = newText
		setItems([...items])
	}

	// Рекурсивный поиск и перемещение
	const moveItemWithFindRecursive = (arr, itemForFind, moveStep) => {

		for (let i = 0; i < arr.length; i++) {

			if (arr[i] === itemForFind) {
				const t = moveInArray(arr, i, i + moveStep)
				if (t) return t
				else break

			} else if (arr[i].child) {
				const t = moveItemWithFindRecursive(arr[i].child, itemForFind, moveStep)

				if (t !== arr[i].child) {
					arr[i].child = t
					return arr
				}
			}
		}

		return arr
	}

	const toRightRecursive = (arr, itemForFind) => {

		for (let i = 0; i < arr.length; i++) {

			if (arr[i] === itemForFind) {
				if (i === 0) return arr
				if (arr[i - 1].child) {
					arr[i - 1].child = [...arr[i - 1].child, arr[i]]
				} else {
					arr[i - 1].child = [arr[i]]
				}
				arr = [...arr.slice(0, i), ...arr.slice(i + 1, arr.length)]
				return arr
				// else break

			} else if (arr[i].child) {
				const t = toRightRecursive(arr[i].child, itemForFind)

				if (t !== arr[i].child) {
					arr[i].child = t
					return arr
				}
			}
		}

		return arr
	}

	const actualDataForLog = (data) => {
		return JSON.parse(JSON.stringify(data))
	}

	const toLeftRecursive = (arr, itemForFind) => {

		let isFound = false

		const recursive = (arr, itemForFind, l = 0) => {

			console.log(l, 'Проверяю наличие элемента на верхнем уровне: ', actualDataForLog(arr))
			if (arr.find(item => item === itemForFind)) {
				console.log('Найден, завершаю поиск')
				return arr
			}
			console.log('На верхнем уровне элемент не найден')

			console.log(l, 'Запускаю поиск по родительскому: ', actualDataForLog(arr))

			for (let i = 0; i < arr.length; i++) {
				console.log(l, 'Запускаю поиск по родительскому, смотрим элемент №: ', i, actualDataForLog(arr[i]))

				if (arr[i].child) {
					console.log(l, 'В этом элементе есть ребёнок: ', actualDataForLog(arr[i].child))

					console.log(l, 'Запускаю поиск по элементам этого ребёнка')
					for (let j = 0; j < arr[i].child.length; j++) {
						console.log(l, actualDataForLog(isFound), 'Запускаю поиск по элементам этого ребёнка:', actualDataForLog(arr[i].child), ' смотрим элемент №: ', j, actualDataForLog(arr[i].child[j]))

						if (isFound) {
							console.log(l, 'Элемент уже найден, прекращаем выполнение рекурсивной функции')
							return arr
						}

						if (arr[i].child[j] === itemForFind) {
							isFound = true
							console.log(l, 'Это то, что мы искали. Нашли', actualDataForLog(arr[i].child[j]), actualDataForLog(isFound))
							arr.splice(i + 1, 0, itemForFind)
							arr[i].child = [...arr[i].child.splice(0, j), ...arr[i].child.splice(j + 1, arr[i].child.length)]

							console.log(l, 'Возвращаем массив', actualDataForLog(arr), actualDataForLog(isFound))

							return arr

						} else {
							console.log(l, 'Это не то, что мы искали', 'arr[i].child[j] === itemForFind -> ', actualDataForLog(arr[i].child[j]), actualDataForLog(itemForFind))

							if (arr[i].child[j].child) {
								console.log(l, 'Найден ребёнок ребёнка, запускаю проверку его элементов', actualDataForLog(arr[i].child[j].child), actualDataForLog(isFound))
								let t = recursive(arr[i].child, itemForFind, l + 1)
								if (t !== arr[i].child) {
									console.log(l, 'toLeftRecursive не равен исходному', actualDataForLog(isFound))
									arr[i].child = t
									return arr
								} else {

								}
							}
						}
					}
				}
			}
			return arr
		}

		return recursive(arr, itemForFind)
	}

	const toUp = (item) => {
		setItems([...moveItemWithFindRecursive(items, item, -1)])
	}

	const toDown = (item) => {
		setItems([...moveItemWithFindRecursive(items, item, 1)])
	}

	const toLeft = (item) => {
		setItems([...toLeftRecursive(items, item)])
	}

	const toRight = (item) => {
		setItems([...toRightRecursive(items, item)])
	}

	const reset = () => {
		console.log(JSON.parse(JSON.stringify(FullNestedComponentsListData)))
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