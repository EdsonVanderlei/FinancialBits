import { NumberUtils } from './number.utils';

describe('NumberUtils', () => {
	test('valid min inclusive', () => {
		const value = 5;
		const min = 5;
		expect(NumberUtils.min(value, min)).toBeTruthy();
	});
	test('invalid min inclusive', () => {
		const value = 4;
		const min = 5;
		expect(NumberUtils.min(value, min)).toBeFalsy();
	});

	test('valid min exclusive', () => {
		const value = 6;
		const min = 5;
		expect(NumberUtils.min(value, min, true)).toBeTruthy();
	});
	test('invalid min exclusive', () => {
		const value = 5;
		const min = 5;
		expect(NumberUtils.min(value, min, true)).toBeFalsy();
	});

	test('valid max inclusive', () => {
		const value = 5;
		const max = 5;
		expect(NumberUtils.max(value, max)).toBeTruthy();
	});
	test('invalid max inclusive', () => {
		const value = 6;
		const max = 5;
		expect(NumberUtils.max(value, max)).toBeFalsy();
	});

	test('valid max exclusive', () => {
		const value = 4;
		const max = 5;
		expect(NumberUtils.max(value, max, true)).toBeTruthy();
	});
	test('invalid max exclusive', () => {
		const value = 5;
		const max = 5;
		expect(NumberUtils.max(value, max, true)).toBeFalsy();
	});

	test('valid minMax', () => {
		const value = 7;
		const min = 5;
		const max = 10;
		expect(NumberUtils.minMax(value, min, max)).toBe(0);
	});
	test('invalid down minMax inclusive', () => {
		const value = 4;
		const min = 5;
		const max = 10;
		expect(NumberUtils.minMax(value, min, max)).toBe(-1);
	});
	test('invalid up minMax inclusive', () => {
		const value = 11;
		const min = 5;
		const max = 10;
		expect(NumberUtils.minMax(value, min, max)).toBe(1);
	});

	test('invalid down minMax exclusive', () => {
		const value = 5;
		const min = 5;
		const max = 10;
		expect(NumberUtils.minMax(value, min, max, true)).toBe(-1);
	});
	test('invalid up minMax exclusive', () => {
		const value = 10;
		const min = 5;
		const max = 10;
		expect(NumberUtils.minMax(value, min, max, true)).toBe(1);
	});
});
