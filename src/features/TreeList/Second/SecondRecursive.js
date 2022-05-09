import {moveInArray} from '../../../shared/utils/utils'
import React, {Fragment} from 'react'
import Item from '../Item'


export class SecondRecursive {
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

	static render(items, indexes= []) {

		return <>
			{items.map((item, index) => (
				<Fragment
					key={item.text} // temp
				>
					<Item
						index={[...indexes, index]}
						item={item}
					/>
					{item.child && <ul> {this.render(item.child, [...indexes, index])}</ul>}
				</Fragment>
			))}
		</>
	}
}