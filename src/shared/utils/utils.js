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

export const deleteItemsFromArray = (array, from, count = 1) => {
	return [[...array.slice(0, from), ...array.slice(from + count, array.length)]]
}