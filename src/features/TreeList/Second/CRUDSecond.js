import {FullNestedComponentsListData} from '../../../shared/data/data-mock-second'
import React from 'react'
import {SecondRecursive} from './SecondRecursive'
import {actualDataForLog, deepCopy, moveInArray} from '../../../shared/utils/utils'


const getArrContainThisElementByIndex = (arr, index, level = 1) => {
	let indexCopy = deepCopy(index)
	if (indexCopy.length <= level)
		return {array: arr, remainingIndexes: indexCopy}
	else
		return getArrContainThisElementByIndex(arr[indexCopy.shift()].child, indexCopy, level)
}

export const second = {
	data: FullNestedComponentsListData,
	number: 2,
	render: (items) => {
		return <ul>{SecondRecursive.render(items)}</ul>
	},
	removeByItem: (items, item) => {
		return [...SecondRecursive.secondFunctionsRemove(items, item)]
	},
	removeByIndex: (items, index) => {
		getArrContainThisElementByIndex(items, index).array
			.splice(index.at(-1), 1)
		return [...items]
	},
	add: (items, indexes) => {

		if (Array.isArray(indexes)) {
			const {array, remainingIndexes} = getArrContainThisElementByIndex(items, indexes)
			array.push({text: 'Empty item'})
			return [...items]
		} else
			return [...items, {text: 'Empty item'}]

	},
	updateByItem: (items, item, newText) => {
		item.text = newText
		return [...items]
	},
	updateByIndex: (items, indexes, newText) => {
		const {array, remainingIndexes} = getArrContainThisElementByIndex(items, indexes, 1)
		array[remainingIndexes[0]].text = newText
		return [...items]
	},
	upByItem: (items, item) => [...SecondRecursive.moveItemWithFindRecursive(items, item, -1)],
	upByIndex: (items, index) => {

		// Если это не первый элемент на своём уровне (есть куда двигать)
		if (index.at(-1) >= 1) {

			if (index.length >= 2) {
				const {array, remainingIndexes} = getArrContainThisElementByIndex(items, index, 2)
				array[remainingIndexes[0]].child = moveInArray(array[remainingIndexes[0]].child, remainingIndexes[1], remainingIndexes[1] - 1)

				return [...items]
			} else {
				return [...moveInArray(items, index[0], index[0] - 1)]
			}
		} else return items
	},
	downByItem: (items, item) => [...SecondRecursive.moveItemWithFindRecursive(items, item, 1)],
	downByIndex: (items, index) => {
		// Если это не последний элемент на своём уровне (есть куда двигать)
		if (getArrContainThisElementByIndex(items, index).array.length - 1 !== index.at(-1)) {
			if (index.length >= 2) {
				const {array, remainingIndexes} = getArrContainThisElementByIndex(items, index, 2)
				console.log('это', actualDataForLog(array[remainingIndexes[0]].child))
				array[remainingIndexes[0]].child = moveInArray(array[remainingIndexes[0]].child, remainingIndexes[1], remainingIndexes[1])
				return [...items]
			} else {
				return [...moveInArray(items, index[0], index[0])]
			}
		} else return items
	},
	leftByItem: (items, item) => [...SecondRecursive.toLeftRecursive(items, item)],
	leftByIndex: (items, indexes) => {

		if (indexes.length >= 2) {
			const {array, remainingIndexes} = getArrContainThisElementByIndex(items, indexes, 2)
			array.insert(array[remainingIndexes[0]].child.splice(remainingIndexes[1], 1).at(0), remainingIndexes[0] + 1)
			return [...items]
		} else return items
	},
	rightByItem: (items, item) => [...SecondRecursive.toRightRecursive(items, item)],
	rightByIndex: (items, indexes) => {

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