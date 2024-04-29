import { AppError } from '../../../shared/classes/app-error';
import { ValidationUtils } from '../../../shared/utils/validation/validation.utils';
import { Email } from './email';

describe('Email', () => {
	test('construct', () => {
		const input = 'johndoe@test.com';
		const email = new Email(input);

		expect(email.value).toEqual(input);
		expect(ValidationUtils.email(email.value)).toBeTruthy();
	});
	test('invalid', () => {
		const input = 'abc';

		expect(() => new Email(input)).toThrow({
			statusCode: 400,
			message: 'Invalid email',
		} as AppError);
	});
	test('skip validation', () => {
		const input = 'abc';
		const uuid = new Email(input, false);

		expect(uuid.value).toEqual(input);
		expect(ValidationUtils.email(uuid.value)).toBeFalsy();
	});
});
