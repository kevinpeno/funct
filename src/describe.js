/**
 * Describes a suite of assertions for a given function
 * @param {Function} fn - function under test
 */
const describe = (fn) => {
	const assertions = []

	return Object.freeze({
		fn,
		get length() {
			return assertions.length
		},
		it: (description) => {
			assertions.push(description)
		},
	})
}

export default describe
