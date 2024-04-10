import helper from "../helper.js";
import expect from "./expect.js"
import { default as testFramework } from "./test.js"

const voidFn = () => { }

// @todo: get rid of public property `description` which is only used for testing
helper("`test` should describe what it is testing", () => (
	expect(
		"this is an example description",
		testFramework(voidFn, "this is an example description").description
	)
))


helper("`test` should have `given` method", () => {
	const actual = testFramework(voidFn, "this is an example description")

	return expect(
		true,
		actual.hasOwnProperty("given") && typeof actual.given === "function"
	)
})

helper("`given` should execute the function under test", () => {
	const testCalls = Math.floor(Math.random() * 10)
	const testFn = () => {
		let fnUnderTestCalls = 0
		const fnUnderTest = () => {
			fnUnderTestCalls++
		}

		const test = testFramework(fnUnderTest, "this is an example description")

		for (let i = 0; i < testCalls; i++) {
			test.given()
		}

		return fnUnderTestCalls
	}

	return expect(
		testCalls,
		testFn
	)
})

helper("`given` should have alias `when`", () => {
	const test = testFramework(voidFn, "this is an example description")

	return expect(
		true,
		test.hasOwnProperty("when") && typeof test.when === "function" && test.when === test.given
	)
})

// given should chain to `given` when the function under test returns a function
helper("`given` should chain to `given` when the function under test returns a function", () => {
	const fnUnderTest = () => () => { }
	const output = testFramework(fnUnderTest, "this is an example description")

	return expect(
		true,
		output.hasOwnProperty("given") && typeof output.given === "function"
	)
})

// when given is no longer returning a function, it should return `expect`
helper("when given is no longer returning a function, it should return `expect`", () => {
	const fnUnderTest = () => () => { }
	const output =
		testFramework(fnUnderTest, "this is an example description")
			.given()
			.given()

	return expect(
		true,
		output.hasOwnProperty("expect") && typeof output.expect === "function"
	)
})
