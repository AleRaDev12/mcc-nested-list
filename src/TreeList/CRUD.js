import {deleteItemsFromArray, moveInArray} from '../shared/utils/utils'
import {NonNestedComponentsListData} from '../entity/data-mock-first'
import {FullNestedComponentsListData} from '../entity/data-mock-second'

// temp
import Item from './Item'
import React, {Fragment} from 'react'


export const first = {
	data: NonNestedComponentsListData,
	number: 1,
	render: (items) => {
		return <ul>
			{items.map((item, i) => <Item
				key={i} //temp
				item={item}
				i={i}
			/>)}
		</ul>
	},
	remove: (items, i, isMoveWithChildren) => {

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

		return deleteItemsFromArray(items, i, countWithChild)
	},

	add: (items) => {
		return [...items, {text: 'Empty item', level: items.at(-1)?.level ?? 1}]
	},

	update: (items, i, newText) => {
		items[i].text = newText
		return [...items]
	},

	up: (i, isMoveWithChildren, items) => {

		if (i === 0) {
			console.log('Выше некуда')
			return items
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
		return [...moveInArray(items, i, to, countWithChild)]

	},

	down: (i, isMoveWithChildren, items) => {

		if (i + 1 === items.length) {
			console.log('Ниже некуда')
			return items
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
				console.log('Ниже некуда')
				return items
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

		return [...moveInArray(items, i, i + countWithChild, countWithChild, countNextWithChild)]
	},

	// Обновить: перемещать ниже элементов текущего уровня
	left: (i, isMoveWithChildren, items) => {
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

		return [...items]
	},

	right: (i, isMoveWithChildren, items) => {
		if (i === 0) {
			console.log('Перемещение невозможно (нет родительского элемента сверху)')
			return [...items]
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

		return [...items]
	},
}

const actualDataForLog = (data) => JSON.parse(JSON.stringify(data))


class Second {
	static secondFunctionsRemove = (arr, itemForDel) => {
		return arr.filter((item) => {
			if (item !== itemForDel) {
				if (!item.child) {
					return item
				} else {
					item.child = this.secondFunctionsRemove(item.child, itemForDel)
					return item
				}
			}
		})
	}

	// Рекурсивный поиск и перемещение
	static moveItemWithFindRecursive = (arr, itemForFind, moveStep) => {

		for (let i = 0; i < arr.length; i++) {

			if (arr[i] === itemForFind) {
				const t = moveInArray(arr, i, i + moveStep)
				if (t) return t
				else break

			} else if (arr[i].child) {
				const t = this.moveItemWithFindRecursive(arr[i].child, itemForFind, moveStep)

				if (t !== arr[i].child) {
					arr[i].child = t
					return arr
				}
			}
		}
		return arr
	}

	static toLeftRecursive = (arr, itemForFind) => {

		let isFound = false

		const recursive = (arr, itemForFind, l = 0) => {

			// console.log(l, 'Проверяю наличие элемента на верхнем уровне: ', actualDataForLog(arr))
			if (arr.find(item => item === itemForFind)) {
				// console.log('Найден, завершаю поиск')
				return arr
			}
			// console.log('На верхнем уровне элемент не найден')

			// console.log(l, 'Запускаю поиск по родительскому: ', actualDataForLog(arr))

			for (let i = 0; i < arr.length; i++) {
				// console.log(l, 'Запускаю поиск по родительскому, смотрим элемент №: ', i, actualDataForLog(arr[i]))

				if (arr[i].child) {
					// console.log(l, 'В этом элементе есть ребёнок: ', actualDataForLog(arr[i].child))

					// console.log(l, 'Запускаю поиск по элементам этого ребёнка')
					for (let j = 0; j < arr[i].child.length; j++) {
						// console.log(l, actualDataForLog(isFound), 'Запускаю поиск по элементам этого ребёнка:', actualDataForLog(arr[i].child), ' смотрим элемент №: ', j, actualDataForLog(arr[i].child[j]))

						if (isFound) {
							// console.log(l, 'Элемент уже найден, прекращаем выполнение рекурсивной функции')
							return arr
						}

						if (arr[i].child[j] === itemForFind) {
							isFound = true
							// console.log(l, 'Это то, что мы искали. Нашли', actualDataForLog(arr[i].child[j]), actualDataForLog(isFound))
							arr.splice(i + 1, 0, itemForFind)
							arr[i].child = [...arr[i].child.splice(0, j), ...arr[i].child.splice(j + 1, arr[i].child.length)]

							// console.log(l, 'Возвращаем массив', actualDataForLog(arr), actualDataForLog(isFound))

							return arr

						} else {
							// console.log(l, 'Это не то, что мы искали', 'arr[i].child[j] === itemForFind -> ', actualDataForLog(arr[i].child[j]), actualDataForLog(itemForFind))

							if (arr[i].child[j].child) {
								// console.log(l, 'Найден ребёнок ребёнка, запускаю проверку его элементов', actualDataForLog(arr[i].child[j].child), actualDataForLog(isFound))
								let t = recursive(arr[i].child, itemForFind, l + 1)
								if (t !== arr[i].child) {
									// console.log(l, 'toLeftRecursive не равен исходному', actualDataForLog(isFound))
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

	static toRightRecursive = (arr, itemForFind) => {

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
				const t = this.toRightRecursive(arr[i].child, itemForFind)

				if (t !== arr[i].child) {
					arr[i].child = t
					return arr
				}
			}
		}

		return arr
	}

	static render(items) {
		return <>
			{items.map(item => <Fragment key={Math.trunc(Math.random() * 10000)}>
				<Item

					item={item}
				/>
				{item.child && <ul> {this.render(item.child)}</ul>}
			</Fragment>)}
		</>
	}
}


export const second = {
	data: FullNestedComponentsListData,
	number: 2,
	render: (items) => {
		return <ul>{Second.render(items)}</ul>
	},
	remove: (items, item) => {
		return [...Second.secondFunctionsRemove(items, item)]
	},
	add: (items) => [...items, {id: Math.trunc(Math.random() * 10000), text: 'Empty item'}],
	update: (items, item, newText) => {
		item.text = newText
		return [...items]
	},
	up: (items, item) => [...Second.moveItemWithFindRecursive(items, item, -1)],
	down: (items, item) => [...Second.moveItemWithFindRecursive(items, item, 1)],
	left: (items, item) => [...Second.toLeftRecursive(items, item)],
	right: (items, item) => [...Second.toRightRecursive(items, item)],
}