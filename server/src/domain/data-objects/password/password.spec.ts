import { AppError } from '../../../shared/classes/app-error';
import { Password } from './password';

describe('Password', () => {
	test('Invalid min length', () => {
		const password = new Password('ab');

		expect(() => password.validate()).toThrow({
			statusCode: 400,
			message: 'Password length must be greater than 4',
		} as AppError);
	});
	test('Invalid max length', () => {
		const password = new Password('abcdefghij123456789');

		expect(() => password.validate()).toThrow({
			statusCode: 400,
			message: 'Password length must be lower than 16',
		} as AppError);
	});
});
