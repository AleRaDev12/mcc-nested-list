Array.prototype.insert = function(items, start) {
	if (Array.isArray(items))
		this.splice(start, 0, ...items)
	else
		this.splice(start, 0, items)

	return this
}

Array.prototype.move = function(from, to, count = 1) {
	if (from >= 0 && from < this.length && to >= 0 && to <= this.length) {

		if (to > from)
			return [...this.insert(this.splice(from, count), to - count)]
		else
			return [...this.insert(this.splice(from, count), to)]

	} else return []
}

Array.prototype.remove = (from, count = 1) => {
	return [...this.slice(0, from), ...this.slice(from + count, this.length)]
}