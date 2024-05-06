import { StringUtils } from "./string.utils"

describe('StringUtils', () => {
	test('snake to camel', () => {
		const input = 'string_test'
		const result = StringUtils.snakeToCamel(input)
		
		expect(result).toBe('stringTest')
	})
	test('camel to snake', () => {
		const input = 'stringTest'
		const result = StringUtils.camelToSnake(input)
		
		expect(result).toBe('string_test')
	})
	test('snake to camel single word', () => {
		const input = 'string'
		const result = StringUtils.snakeToCamel(input)
		
		expect(result).toBe(input)
	})
	test('camel to snake single word', () => {
		const input = 'string'
		const result = StringUtils.camelToSnake(input)
		
		expect(result).toBe(input)
	})
})