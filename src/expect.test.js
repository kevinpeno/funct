import helper from "../helper.js"
import expect from "./expect.js"

helper("expect should return true when `expected` and `actual` are equal", () => (
	expect(
		expect(true, true).passed,
		true
	)
))

helper("expect should return false when `expected` and `actual` are not equal", () => (
	expect(
		expect(true, false).passed,
		false
	)
))

// when passed a function to expected, expect should execute that function to get the value
helper("expect should execute a function passed to expected", () => (
	expect(
		expect(
			() => true,
			true
		).passed,
		true
	)
))

// when passed a function to actual, expect should execute that function to get the value
helper("expect should execute a function passed to actual", () => (
	expect(
		expect(
			true,
			() => true
		).passed,
		true
	)
))
