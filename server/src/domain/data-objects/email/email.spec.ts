import { AppError } from '../../../shared/classes/app-error';
import { Email } from './email';

describe('Email', () => {
	test('Invalid email', () => {
		const input = 'abc';
		const email = new Email(input);

		expect(() => email.validate()).toThrow({
			statusCode: 400,
			message: 'Invalid email',
		} as AppError);
	});
});
