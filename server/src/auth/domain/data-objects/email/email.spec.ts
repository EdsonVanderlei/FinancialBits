import { AppError } from '../../../../shared/classes/app-error';
import { Email } from './email';

describe('Email', () => {
	test('Create', () => {
		const input = 'abc@test.com';

		expect(() => Email.create(input)).not.toThrow();
	});
	test('Invalid email', () => {
		const input = 'abc';

		expect(() => Email.create(input)).toThrow({
			statusCode: 400,
			message: 'Invalid email',
		} as AppError);
	});
});
