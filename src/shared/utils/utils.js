Array.prototype.insert = function(items, start) {
	if (Array.isArray(items))
		this.splice(start, 0, ...items)
	else
		this.splice(start, 0, items)

	return this
}

export const moveInArray = (array, from, to, count = 1) => {
	if (from >= 0 && from < array.length && to >= 0 && to <= array.length) {

		if (to > from)
			return [...array.insert(array.splice(from, count), to - count)]
		else
			return [...array.insert(array.splice(from, count), to)]

	} else return null
}

// and add new array
export const deleteItemsFromArray = (array, from, count = 1) => {
	return [...array.slice(0, from), ...array.slice(from + count, array.length)]
}

export const actualDataForLog = (data) => JSON.parse(JSON.stringify(data))

export const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))