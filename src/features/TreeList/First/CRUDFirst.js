import {NonNestedComponentsListData} from '../../../shared/data/data-mock-first'
import {deleteItemsFromArray, moveInArray} from '../../../shared/utils/utils'
import React from 'react'


export const first = {
	data: NonNestedComponentsListData,

	getCountWithChild: (items, index) => {
	},

	getItemsForPrintNested: (items) => {

		// add indexes or delete this function
		// return items

		let resultArray = []
		let linksArray = [resultArray]
		let nowLevel = 1
		let to = linksArray[0]

		items.forEach((item, index) => {
			if (item.level === nowLevel) {
				to.push({text: item.text, level: item.level, child: [], index: index})
				linksArray[nowLevel] = to.at(-1).child
			} else if (item.level > nowLevel) {
				if (!linksArray[nowLevel]) linksArray[nowLevel] = []
				to = linksArray[nowLevel]
				nowLevel = item.level
				to.push({text: item.text, level: item.level, child: [], index: index})
				linksArray[nowLevel] = to.at(-1).child

			} else if (item.level < nowLevel) {
				linksArray.pop()
				nowLevel = item.level
				to = linksArray[nowLevel - 1]
				to.push({text: item.text, level: item.level, child: [], index: index})
				linksArray[nowLevel] = to.at(-1).child
			}
		})

		return resultArray
	},

	getItemsForPrintLinear: (items) => {
		return items.map((item, i) => {
			return {...item, index: i}
		})
	},

	remove: (items, item, isMoveWithChildren) => {

		let countWithChild = 1
		const i = item.index

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

	add: (items, index) => {

		if (typeof (index) === 'number') {
			// temp - вынести в отдельную функцию (код повторяется)
			let countWithChild = 1
			for (let j = index + 1; j < items.length; j++) {
				if (items[j].level > items[index].level)
					countWithChild++
				else if (items[j].level === items[index].level)
					break
			}

			return [...items.insert({text: 'Empty item', level: items[index].level}, index + countWithChild)]
		} else
			return [...items, {text: 'Empty item', level: items.at(-1)?.level ?? 1}]
	},

	update: (items, item, newText) => {
		items[item.index].text = newText
		return [...items]
	},

	up: (items, item, isMoveWithChildren) => {
		const i = item.index
		if (i === 0 || items[i].level > items[i - 1].level) {
			console.log('Выше некуда')
			return items
		}

		let countWithChild = 1
		let to = i

		if (isMoveWithChildren) {
			// определить количество вложенных элементов в данный
			for (let j = i + 1; j < items.length; j++) {
				if (items[j].level > items[i].level)
					countWithChild++
				else if (items[j].level === items[i].level)
					break
			}

			// определить индекс для вставки
			for (let j = i - 1; j >= 0; j--) {
				if (items[j].level <= items[i].level) {
					to = j
					break
				}
			}

		}
		return [...moveInArray(items, i, to, countWithChild)]

	},

	down: (items, item, isMoveWithChildren) => {

		const i = item.index
		if (i + 1 === items.length || items[i + 1].level < items[i].level) {
			console.log('Ниже некуда')
			return items
		}

		let countWithChild = 1
		let to = i + 2

		if (isMoveWithChildren) {
			// определить количество вложенных элементов в данный
			for (let j = i + 1; j < items.length; j++) {
				if (items[j].level > items[i].level)
					countWithChild++
				else if (items[j].level === items[i].level)
					break
			}

			if (i + countWithChild >= items.length) {
				console.log('Ниже некуда')
				return items
			}

			// определить индекс для вставки
			if (items[i + countWithChild].level !== items[i].level) {
				to = i + countWithChild
			} else {
				if (items.length === i + countWithChild + 1) {
					to = i + countWithChild + 1
				} else {
					for (let j = i + countWithChild + 1; j < items.length; j++) {
						if (items[j].level <= items[i].level) {
							to = j
							break
						} else if (j === items.length - 1) {
							to = items.length
						}
					}
				}
			}
		}

		return [...moveInArray(items, i, to, countWithChild)]
	},

	left: (items, item, isMoveWithChildren) => {

		const i = item.index
		if (items[i].level > 1) {
			items[i].level--

			if (isMoveWithChildren) {
				// сместить все вложенные элементы влево
				// определить количество элементов текущего элемента с его наследниками
				let countWithChild = 1
				let to = i + 1

				const startLevel = items[i].level + 1
				let isFindingCountWithChild = true

				for (let j = i + 1; j < items.length; j++) {
					if (items[j].level > startLevel && isFindingCountWithChild) {
						countWithChild++
						items[j].level--
					} else if (items[j].level < startLevel) {
						to = j
						break
					} else isFindingCountWithChild = false
				}

				return [...moveInArray(items, i, to, countWithChild)]
			}
		} else return [...items]

	},

	right: (items, item, isMoveWithChildren) => {
		const i = item.index
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