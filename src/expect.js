import assert from "assert"

/**
 * compares expected and actual values and returns results
 * @param {any} supposedlyExpected
 * @param {any} supposedlyActual
 */
export default (supposedlyExpected, supposedlyActual) => {
	const expected = typeof supposedlyExpected === "function" ? supposedlyExpected() : supposedlyExpected
	const actual = typeof supposedlyActual === "function" ? supposedlyActual() : supposedlyActual

	try {
		if (typeof expected === "function" || typeof actual === "function")
			assert.strictEqual(expected, actual)
		else
			assert.deepStrictEqual(expected, actual)
	} catch (e) {
		return ({
			expected,
			actual,
			passed: false
		})
	}

	return Object.freeze({
		expected,
		actual,
		passed: true
	})
}
