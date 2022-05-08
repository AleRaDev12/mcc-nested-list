import {FullNestedComponentsListData} from '../../../shared/data/data-mock-second'
import React from 'react'
import {Second} from './SecondRecursive'


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