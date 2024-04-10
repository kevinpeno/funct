/**
 * Describes a suite of assertions for a given function
 * @param {Function} fn
 */
export default (fn) => {
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
