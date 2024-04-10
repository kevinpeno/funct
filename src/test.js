import expect from "./expect.js"

/**
 * Test execution function
 *
 * @param {function} fn
 * @param {string} description
 */
export default (fn, description) => (
	testFactory(description, given(fn, description))
)

const testFactory = (description, given) => (
	Object.freeze({
		description,
		/**
		 * Applies arguments to the function under test
		 *
		 * @param  {...any} args
		 */
		given,
		/**
		 * Applies arguments to the function under test
		 *
		 * @param  {...any} args
		 */
		when: given,
	})
)

const expectFactory = (actual) => (
	Object.freeze({
		expect: (expected) => (
			expect(expected, actual)
		)
	})
)

const given = (fn, description) => (...args) => {
	const output = fn.apply(null, args)
	if (typeof output === "function")
		return testFactory(description, given(output, description))
	else
		return expectFactory(output)
}
