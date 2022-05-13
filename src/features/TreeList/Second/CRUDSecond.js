import {FullNestedComponentsListData} from '../../../shared/data/data-mock-second'
import React from 'react'
import {deepCopy, moveInArray} from '../../../shared/utils/utils'


const getArrContainThisElementByIndex = (arr, index, level = 1) => {
	let indexCopy = deepCopy(index)
	if (indexCopy.length <= level)
		return {array: arr, remainingIndexes: indexCopy}
	else
		return getArrContainThisElementByIndex(arr[indexCopy.shift()].child, indexCopy, level)
}

export const second = {
	data: FullNestedComponentsListData,

	getItemsForPrintNested: (items) => {
		const render = (items, indexes = []) => {
			return items && items.map((item, index) => {
				if (item.child) {
					item.child = render(item.child, [...indexes, index])
				}
				return {...item, index: 'indexes=' + JSON.stringify([...indexes, index])}
			})
		}
		return [...render(items)]
	},

	getItemsForPrintLinear: (items) => {

		let level = 1
		const res = []

		const render = (items, indexes = []) => {

			if (items) {
				items.forEach((item, index) => {
					res.push({...item, index: 'indexes=' + JSON.stringify([...indexes, index]), level: level})

					if (item.child) {
						level++
						render(item.child, [...indexes, index])
						level--
					}
				})
			}
		}
		render(items)
		return res
	},

	remove: (items, item) => {
		const index = item.index
		getArrContainThisElementByIndex(items, index).array
			.splice(index.at(-1), 1)
		return [...items]
	},
	add: (items) => [...items, {text: 'Empty item'}],

	update: (items, item, newText) => {
		const indexes = item.index
		const {array, remainingIndexes} = getArrContainThisElementByIndex(items, indexes, 1)
		array[remainingIndexes[0]].text = newText
		return [...items]
	},
	up: (items, item) => {
		const indexes = item.index
		// Если это не первый элемент на своём уровне (есть куда двигать)
		if (indexes.at(-1) >= 1) {

			if (indexes.length >= 2) {
				const {array, remainingIndexes} = getArrContainThisElementByIndex(items, indexes, 2)
				array[remainingIndexes[0]].child = moveInArray(array[remainingIndexes[0]].child, remainingIndexes[1], remainingIndexes[1] - 1)

				return [...items]
			} else {
				return [...moveInArray(items, indexes[0], indexes[0] - 1)]
			}
		} else return items
	},
	down: (items, item) => {
		const indexes = item.index

		// Если это не последний элемент на своём уровне, есть место, куда двигать
		if (getArrContainThisElementByIndex(items, indexes).array.length - 1 !== indexes.at(-1)) {
			if (indexes.length >= 2) {
				const {array, remainingIndexes} = getArrContainThisElementByIndex(items, indexes, 2)
				array[remainingIndexes[0]].child = moveInArray(array[remainingIndexes[0]].child, remainingIndexes[1], remainingIndexes[1] + 2)
				return [...items]
			} else {
				return [...moveInArray(items, indexes[0], indexes[0] + 2)]
			}
		} else return items
	},
	left: (items, item) => {
		const indexes = item.index

		if (indexes.length >= 2) {
			const {array, remainingIndexes} = getArrContainThisElementByIndex(items, indexes, 2)
			array.insert(array[remainingIndexes[0]].child.splice(remainingIndexes[1], 1).at(0), remainingIndexes[0] + 1)
			return [...items]
		} else return items
	},
	right: (items, item) => {
		const indexes = item.index

		if (indexes.at(-1) !== 0) {
			const {array, remainingIndexes} = getArrContainThisElementByIndex(items, indexes, 1)
			if (!array[remainingIndexes[0] - 1].child) {
				array[remainingIndexes[0] - 1].child = []
			}
			array[remainingIndexes[0] - 1].child.insert(array.splice(remainingIndexes[0], 1).at(0), array[remainingIndexes[0] - 1].child.length)

			return [...items]
		} else return items
	},
}