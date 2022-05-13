import {LinkedComponentsListData} from '../../../shared/data/data-mock-third'
import React from 'react'
import {deepCopy, moveInArray} from '../../../shared/utils/utils'


const getArrContainThisElementByIndex = (arr, index, level = 1) => {
	let indexCopy = deepCopy(index)
	if (indexCopy.length <= level)
		return {array: arr, remainingIndexes: indexCopy}
	else
		return getArrContainThisElementByIndex(arr[indexCopy.shift()].child, indexCopy, level)
}

let maxId = 0
const ORDER_START = 1

export const third = {
	data: LinkedComponentsListData,

	getItemsForPrintNested: (items) => {
		if (items) {

			let itemsForPrint = deepCopy(items)

			itemsForPrint.forEach((child, i) => {
				if (child.id >= maxId)
					maxId = child.id

				child.index = 'id=' + child.id + ', ord=' + child.order

				if (child.parent) {
					const parent = itemsForPrint.find(parent => child.parent === parent.id)
					if (parent) {
						if (!parent.child)
							parent.child = []
						parent.child.push(child)
						parent.child.sort((a, b) => a.order - b.order)
					} else {
						// ошибка в данных
					}
				}
			})

			itemsForPrint = itemsForPrint
				.filter(item => !item.parent)
				.sort((a, b) => a.order - b.order)

			return itemsForPrint
		}

		return items
	},

	// not worked
	getItemsForPrintLinear: (items) => {

		let arr = [...items]

		arr.sort((a, b) => a.order - b.order)
		arr = arr.map(item => {
			return {...item, index: 'id=' + item.id + ', ord=' + item.order}
		})

		const index = [...arr].reverse()

		index.forEach((item, i) => {
			if (item.parent !== null) {
				const currItemIndex = arr.findIndex(f => f.id === item.id)
				const parentIndex = arr.findIndex(f => f.id === item.parent)

				let childCount = 1

				if (currItemIndex < arr.length && arr[currItemIndex + 1].parent) {
					if (arr[currItemIndex + 1].parent === arr[currItemIndex].id) {
						childCount++
						for (let i = currItemIndex + 2; i < arr.length; i++) {
							if (arr[i].parent === arr[currItemIndex].id) {
								childCount++
							}
						}
					}
				}

				arr = moveInArray(arr, currItemIndex, parentIndex + 1, childCount)
			}
		})

		let level = 1
		for (let i = 0; i < arr.length; i++) {
			if (!arr[i].parent) {
				arr[i] = {...arr[i], level: 1, index: arr[i].index + ' lvl=' + level}
			} else {
				if (i > 0 && arr[i].parent === arr[i - 1].id) {
					level = arr[i - 1].level + 1
				} else {
					// temp - можно оптимизировать
					const f = arr.find(f => f.id === arr[i].parent)
					if (f) level = f.level + 1
				}
				arr[i] = {...arr[i], level: level, index: arr[i].index + ' lvl=' + level}
			}

		}

		console.log('arr=', arr)

		return arr
	},

	remove: (items, item) => {

		console.log('remove')
		console.log('item=', item)

		// temp error - удалить детей рекурсивно
		items = items.filter(f => f.id !== item.id && f.parent !== item.id)
		items.forEach(fitem => {
			if (fitem.order > item.order && fitem.parent === item.parent) {
				fitem.order--
			}
		})

		return [...items]
	},

	add: (items) => {
		maxId++

		const order = items
				.filter(item => !item.parent)
				//temp - видимо здесь ошибка
				.reduce((acc, curr) => acc.order > curr.order ? acc : curr).order
			+ 1

		return [...items, {text: 'Empty item', id: maxId, order: order, parent: null}]
	},

	update: (items, item, newText) => {
		items.find(f => f.id === item.id).text = newText
		return [...items]
	},
	up: (items, item) => {

		if (item.order === ORDER_START)
			return items

		const prevItem = items.find(f => f.parent === item.parent && f.order === item.order - 1)
		const currItem = items.find(f => f.id === item.id);

		[prevItem.order, currItem.order] = [currItem.order, prevItem.order]

		return [...items]
	},
	down: (items, item) => {
		const prevItem = items.find(f => f.parent === item.parent && f.order === item.order + 1)

		if (!prevItem) {
			return items
		} else {
			const currItem = items.find(f => f.id === item.id);
			[prevItem.order, currItem.order] = [currItem.order, prevItem.order]
			return [...items]
		}
	},

	left: (items, item) => {

		if (!item.parent)
			return items

		const parent = items.find(f => f.id === item.parent)
		if (!parent)
			return items

		const currItem = items.find(f => f.id === item.id)

		items.forEach(fitem => {
			if (fitem.parent === parent.parent && fitem.order > parent.order) {
				fitem.order++
			}

			if (fitem.parent === item.parent && fitem.order > item.order) {
				fitem.order--
			}
		})
		currItem.order = parent.order + 1
		currItem.parent = parent.parent

		return [...items]
	},

	right: (items, item) => {

		if (item.order === ORDER_START)
			return items

		const prevItem = items.find(f => f.parent === item.parent && f.order === item.order - 1)
		const currItem = items.find(f => f.id === item.id)

		items.forEach(fitem => {
			if (fitem.parent === item.parent && fitem.order > item.order) {
				fitem.order--
			}
		})

		currItem.parent = prevItem.id

		if (!items.find(f => f.parent === currItem.parent)) {
			currItem.order = ORDER_START
		} else {
			// temp - change to reducer
			currItem.order = items.filter(f => f.parent === currItem.parent).length
		}
		return [...items]
	},
}