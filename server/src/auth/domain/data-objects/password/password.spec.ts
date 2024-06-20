import { AppError } from '../../../../shared/classes/app-error';
import { Password } from './password';

describe('Password', () => {
	test('Create', () => {
		const input = 'abc123';
		let password: Password;

		expect(() => (password = Password.create(input))).not.toThrow();
		expect(password!.value).not.toEqual(input);
	});
	test('Password length must be greater than 4', () => {
		const input = 'abc';

		expect(() => Password.create(input)).toThrow({
			statusCode: 400,
			message: 'Password length must be greater than 4',
		} as AppError);
	});
	test('Password length must be lower than 16', () => {
		const input = '1bc123456789101112';

		expect(() => Password.create(input)).toThrow({
			statusCode: 400,
			message: 'Password length must be lower than 16',
		} as AppError);
	});
	test('Compare valid', () => {
		const input = 'abc123';
		const password = Password.create('abc123');

		expect(() => password.compare(input)).not.toThrow();
	});
	test('Compare invalid', () => {
		const password = Password.create('abc123');

		expect(() => password.compare('abc12')).toThrow({
			statusCode: 401,
			message: 'Invalid password',
		} as AppError);
	});
});
