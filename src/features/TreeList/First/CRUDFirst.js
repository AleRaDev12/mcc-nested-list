import {NonNestedComponentsListData} from '../../../shared/data/data-mock-first'
import Item from '../Item'
import {actualDataForLog, deleteItemsFromArray, moveInArray} from '../../../shared/utils/utils'
import React from 'react'


export const first = {
	data: NonNestedComponentsListData,
	number: 1,
	render: (items) => {
		return <ul>
			{items.map((item, index) => <Item
				key={item.text} //temp
				item={item}
				index={index}
			/>)}
		</ul>
	},

	getItemsForPrintNested: (items, level = 1) => {

		let o = 0
// Не оптимизировано. j увеличивается только на количество "детей" одного уровня, а не всех сразу)
		const recursive = (items, level, iterLevel = 1) => {
			let res = []
			let countChildren = 0

			for (let j = 0; j < items.length; j++) {

				console.log(' ')

				o++
				console.log(`========= ${o} =========`)

				console.log(`il-${iterLevel} ---------------------------------------------------`)
				console.log(`il-${iterLevel}`, iterLevel, 'j', j, 'level', level, 'items[j]', actualDataForLog(items[j]))
				console.log(`il-${iterLevel}`, iterLevel, 'res before = ', JSON.stringify(res, null,''))

				if (items[j].level === level) {
					res.push({text: items[j].text})

					console.log(`il-${iterLevel}`, iterLevel, 'push', items[j].text)

				} else if (items[j].level === level + 1) {

					console.log(`il-${iterLevel}`, iterLevel, 'j', j, 'level', level, 'items.slice(j+1)', actualDataForLog(items.slice(j)))

					if (!res.at(-1).child)
					{
						let c
						[res.at(-1).child, c] = recursive(items.slice(j), level + 1, iterLevel + 1)
						countChildren += c
						console.log(`il-${iterLevel}`, iterLevel, 'res.at(-1).child', res.at(-1).child)
					}
					else {
						console.log(`il-${iterLevel}`, iterLevel, 'Здесь хотел перепресвоить child')
					}

					console.log(`il-${iterLevel}`, iterLevel, 'old j = ', j)
					countChildren += res.at(-1).child.length - 1
					j += countChildren
					console.log(`il-${iterLevel}`, iterLevel, 'new j = ', j)

				} else  if (items[j].level < level) {

					console.log(`il-${iterLevel}`, iterLevel, 'break')
					console.log(`il-${iterLevel}`, iterLevel, 'res after = ', JSON.stringify(res, null,' '))
					break
				}
				console.log(`il-${iterLevel}`, iterLevel, 'res after = ', JSON.stringify(res, null,' '))
			}
			console.log(`il-${iterLevel} ----- end ---------------------------------------------------`)
			return [res, countChildren]
		}

		const [result] = recursive(items, level)
		return result
	},

	getItemsForPrintLinear: (items) => {
		// temp - change linear to const
		return items
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

	update
:
(items, i, newText) => {
	items[i].text = newText
	return [...items]
},

	up
:
(i, isMoveWithChildren, items) => {

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

	down
:
(i, isMoveWithChildren, items) => {

	if (i + 1 === items.length || items[i + 1].level < items[i].level) {
		console.log('Ниже некуда')
		return items
	}

	let countWithChild = 1
	let countNextWithChild = 1
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

	// Обновить: перемещать ниже элементов текущего уровня
	left
:
(i, isMoveWithChildren, items) => {
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

	right
:
(i, isMoveWithChildren, items) => {
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