import { AppError } from '../../../shared/classes/app-error';
import { ValidationUtils } from '../../../shared/utils/validation/validation.utils';
import { JWT } from './jwt';

describe('JWT', () => {
	test('construct', () => {
		const input =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
		const jwt = new JWT(input);

		expect(jwt.value).toEqual(input);
		expect(ValidationUtils.jwt(jwt.value)).toBeTruthy();
	});
	test('invalid', () => {
		const input = 'abc';

		expect(() => new JWT(input)).toThrow({
			statusCode: 400,
			message: 'Invalid token',
		} as AppError);
	});
	test('skip validation', () => {
		const input = 'abc';
		const jwt = new JWT(input, false);

		expect(jwt.value).toEqual(input);
		expect(ValidationUtils.jwt(jwt.value)).toBeFalsy();
	});
});
