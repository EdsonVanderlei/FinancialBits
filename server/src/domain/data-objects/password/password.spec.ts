import { AppError } from '../../../shared/classes/app-error';
import { NumberUtils } from '../../../shared/utils/number/number.utils';
import { Password } from './password';

describe('Password', () => {
	test('construct', () => {
		const input = 'abc123';
		const password = new Password(input);
		expect(password).toBeDefined();
	});
	test('invalid minLength', () => {
		const input = 'ab';
		expect(() => new Password(input)).toThrow({
			statusCode: 400,
			message: 'Password length must be greater than 4',
		} as AppError);
	});
	test('invalid maxLength', () => {
		const input = 'abcdefghij123456789';
		expect(() => new Password(input)).toThrow({
			statusCode: 400,
			message: 'Password length must be lower than 16',
		} as AppError);
	});
	test('skip validation', () => {
		const input = 'abc123';
		const password = new Password(input, false);
		expect(NumberUtils.min(password.value.length, 5)).toBeTruthy();
		expect(NumberUtils.max(password.value.length, 15)).toBeFalsy();
	});
	test('hash', () => {
		const input = 'abc123';
		const password = new Password(input);
		expect(input === password.value).toBeFalsy();
	});

	test('skip hash', () => {
		const input = 'abc123';
		const password = new Password(input, false, false);
		expect(input === password.value).toBeTruthy();
	});

	test('compare valid', () => {
		const input = 'abc123';
		const password = new Password(input, false, true);

		expect(password.compare(input)).toBeTruthy();
	});

	test('compare invalid', () => {
		const input = 'abc123';
		const password = new Password(input, false, true);

		expect(password.compare('123')).toBeFalsy();
	});
});
