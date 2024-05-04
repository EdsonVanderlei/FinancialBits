import { AppError } from '../../../shared/classes/app-error';
import { JWTUtils } from '../../../shared/utils/jwt/jwt.utils';
import { JWT } from './jwt';

describe('JWT', () => {
	test('construct', () => {
		const input =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
		const jwt = new JWT(input);

		expect(jwt.value).toEqual(input);
		expect(JWTUtils.regex(jwt.value)).toBeTruthy();
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
		expect(JWTUtils.regex(jwt.value)).toBeFalsy();
	});
	test('generate', () => {
		const secretKey = 'secretKey';
		const payload = { sub: 'john', name: 'doe' };
		const token = JWT.generate(payload, secretKey);

		expect(JWTUtils.regex(token.value)).toBeTruthy();
	});
	test('payload', () => {
		const secretKey = 'secretKey';
		const payload = { sub: 'john', name: 'doe' };
		const token = JWT.generate(payload, secretKey);

		expect(token.payload!.name).toBe('doe');
	});
	test('verify valid', () => {
		const secretKey = 'secretKey';
		const payload = { sub: 'john', name: 'doe' };
		const token = JWT.generate(payload, secretKey);

		expect(token.verify(secretKey)!.name).toBe('doe');
	});
	test('verify invalid', () => {
		const secretKey = 'secretKey';
		const payload = { sub: 'john', name: 'doe' };
		const token = JWT.generate(payload, secretKey);

		expect(() => token.verify('secret')).toThrow({
			statusCode: 500,
			message: 'invalid signature',
		} as AppError);
	});
});
