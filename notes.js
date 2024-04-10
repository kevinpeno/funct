// functions for testing purposes
const identity = arg => arg
const sum = a => b => a + b
const double = num => sum(num)(num)
const trade = (a,b) => {
	// implementation of the trade function
}

// Unit under test
const compose = (reverse, ...functions) => input =>
	reverse === true
		? compose.apply(null, functions.reverse())(input)
		: [reverse]
			.concat(functions)
			.reduce((output, f) =>
				f(output), input
			)

// POC framework
const describe = (f) => ({
	it: description => test(
		expect(description, describe(f))
	)(f)
})

// used as jumping off point during "it" phase
const test = expect => f => ({
	given: given(f, test(expect)),
	when: given(f, test(expect)),
	expect: expect(f)
})

const given = (f, then) => (...args) =>
	then(f.apply(null, args))

const expect = (description, then) => actual => expected => {
	if (actual !== expected) {
		throw `expectation failed, received: ${actual}; expected: ${expected}`
	}
	else {
		console.log(`Success: ${description}`)
		return then
	}
}

/*
	`describe`     is passed the unit under test (UUT)
	`it`           initializes the test and sets a friendly name
	`when`/`given` both work the same, they call the UUT with the supplied values
	`expect`       ends the test and provides an expectation to match UUT's output

	Issues:
		1. failing to call `.it` on describe could lead to issues, but `it` being undefined would trigger an error. Example:
		```
			describe()
				it() // error
		```
		when they meant to do:
		```
			describe()
				.it()
		```

		2. `.expect()` ends a test, erroring if anything other than `.it` is called next to prevent accidental nesting issues
*/
describe(compose)
	.it("calls the functions supplied against the input")
		.given("we have a set of calculations", sum(3), double)
		.when("we provide a value to calculate", 1)
		.then("the output should match", 8)
	.it("can apply the operations in reverse")
		.given(true, sum(3), double)
		.when(2)
		.expect(7)

describe(trade)
	.it("transfers items between two parties")
		.given("Bob wants to trade apples for oranges", ["apple"])
		.and("Alice wants to trade oranges for apples", ["orange"])

