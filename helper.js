import expect from "./src/expect.js"
/**
 * helper to limit repetition during bootstrapping
 *
 * @callback TestFn
 * @returns {ReturnType<typeof expect>}
 *
 * @param {TestFn} fn
 */
export default (description, fn) => {
	const output = fn()

	if (output.passed) {
		console.info(`\x1b[92mSuccess: ${description}`)
	} else {
		console.error(`\x1b[91mFailure: ${description}; expected ${output.expected}, got ${output.actual}`)
	}
}
