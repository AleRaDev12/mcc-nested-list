import {DataForLinked} from '../../../shared/data/data-mock-third'
import React from 'react'


let maxId = 0
const ORDER_START = 1

export const third = {
	data: DataForLinked,

	getItemsForPrintNested: (items) => {
		if (items) {

			let itemsForPrint = JSON.parse(JSON.stringify(items))

			itemsForPrint.forEach((child, i) => {
				if (child.id >= maxId)
					maxId = child.id

				child.caption = 'id ' + child.id + ', ord ' + child.order

				if (child.parent) {
					const parent = itemsForPrint.find(parent => child.parent === parent.id)
					if (parent) {
						if (!parent.child)
							parent.child = []
						parent.child.push(child)
						parent.child.sort((a, b) => a.order - b.order)
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

	getItemsForPrintLinear: (items) => {
		let arr = [...items]

		arr.sort((a, b) => a.order - b.order)
		arr = arr.map(item => {
			return {...item, caption: 'id ' + item.id + ', ord ' + item.order}
		})

		const index = [...arr].reverse()

		index.forEach((item, i) => {

			if (item.id >= maxId)
				maxId = item.id

			if (item.parent !== null) {

				const currItemIndex = arr.findIndex(f => f.id === item.id)
				const parentIndex = arr.findIndex(f => f.id === item.parent)

				let childCount = 1

				if (currItemIndex + 1 < arr.length && arr[currItemIndex + 1].parent && arr[currItemIndex + 1].parent === arr[currItemIndex].id) {
					childCount++
					const parents = [arr[currItemIndex].id, currItemIndex + 1]
					for (let i = currItemIndex + 2; i < arr.length; i++) {
						if (arr[i].parent && parents.indexOf(arr[i].parent !== -1)) {
							childCount++
							parents.push(arr[i].id)
						} else break
					}
				}
				arr = arr.move(currItemIndex, parentIndex + 1, childCount)
			}
		})

		let level = 1
		for (let i = 0; i < arr.length; i++) {
			if (!arr[i].parent) {
				arr[i] = {...arr[i], level: 1, caption: arr[i].caption + ', lvl ' + 1}
			} else {
				if (i > 0 && arr[i].parent === arr[i - 1].id) {
					level = arr[i - 1].level + 1
				} else {
					// temp - можно оптимизировать
					const f = arr.find(f => f.id === arr[i].parent)
					if (f) level = f.level + 1
				}
				arr[i] = {...arr[i], level: level, caption: arr[i].caption + ', lvl ' + level}
			}
		}

		return arr
	},

	remove: (items, item) => {

		items = items.filter(f => f.id !== item.id)

		// Обновить номера сортировки для всех следующих элементов в текущем уровне
		items.forEach(fitem => {
			if (fitem.order > item.order && fitem.parent === item.parent) {
				fitem.order--
			}
		})

		const childForRemove = [item.id]
		//items.filter(f => f.parent === item.id)
		do {
			const nid = childForRemove.shift()
			items = items.filter(fitem => {
				if (fitem.parent && fitem.parent === nid) {
					childForRemove.push(fitem.id)
					return false
				} else return true
			})
		} while (childForRemove.length !== 0)

		return [...items]
	},

	add: (items, index) => {
		if (typeof (index) !== 'number') {
			maxId++

			const order = items
					.filter(item => !item.parent)
					//temp - переписать строку
					.reduce((acc, curr) => acc.order > curr.order ? acc : curr).order
				+ 1

			return [...items, {text: 'Empty item', id: maxId, order: order, parent: null}]
		} else {

		}
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