Array.prototype.insert = function ( item, index ) {
	this.splice( index, 0, item );
}

export const moveInArray = (array, from, to, count = 1, count2 = 1) => {

	if (from !== to && from >= 0 && from < array.length && to >= 0 && to < array.length) {
		if (from > to) {
			return [
				...array.slice(0, to),
				...array.slice(from, from + count),
				...array.slice(to, from),
				...array.slice(from + count, array.length),
			]
		} else {
			return [
				...array.slice(0, from),
				...array.slice(to, to + count2),
				...array.slice(from, from + count),
				...array.slice(to + count2, array.length),
			]
		}
	} else return null
}

// and add new array
export const deleteItemsFromArray = (array, from, count = 1) => {
	return [...array.slice(0, from), ...array.slice(from + count, array.length)]
}

export const actualDataForLog = (data) => JSON.parse(JSON.stringify(data))

export const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))