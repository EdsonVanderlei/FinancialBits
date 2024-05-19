import { AppError } from '../../../shared/classes/app-error';
import { JWT } from './jwt';

describe('JWT', () => {
	test('generate', () => {
		const key = 'secretKey';
		const payload = { sub: 'john doe' };
		const jwt = JWT.create(payload, key);
		jwt.validate();

		expect(true).toBeTruthy();
	});
	test('Invalid token', () => {
		const input = 'abc';
		const jwt = new JWT(input);

		expect(() => jwt.validate()).toThrow({
			statusCode: 400,
			message: 'Invalid token',
		} as AppError);
	});
});
