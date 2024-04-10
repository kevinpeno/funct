import assert from "assert"
import helper from "../helper.js"
import expect from "./expect.js"

import describe from "./describe.js"

const voidFn = () => { }

helper("describe should store the function under test", () => (
	expect(
		() => voidFn,
		() => describe(voidFn).fn
	)
))

helper("it should exist", () => (
	expect(
		true,
		() => describe(voidFn).hasOwnProperty("it")
	)
))

helper("it should enumerate the number of assertions being described", () => (
	expect(
		1,
		() => {
			const suite = describe(voidFn)
			suite.it("first test")
			return suite.length
		}
	)
))
