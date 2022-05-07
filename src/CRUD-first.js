import {deleteItemsFromArray, moveInArray} from './shared/utils/utils'




export const first = {
	deleteItem: (i, isMoveWithChildren, items) => {

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

	update: (i, newText, items) => {
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
		console.log([...moveInArray(items, i, to, countWithChild)])
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
				console.log('Ниже некуда 2')
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
	}
}