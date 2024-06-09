import { AppError } from '../../../shared/classes/app-error';
import { UUID } from '../uuid/uuid';
import { JWT } from './jwt';

describe('JWT', () => {
	test('Create', () => {
		const input =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

		expect(() => JWT.create(input)).not.toThrow();
	});
	test('Generate', () => {
		const payload = { userId: UUID.generate(), userFullName: 'John Doe' };
		const jwt = JWT.generate(payload, 'secretKey');

		expect(jwt).toBeDefined();
		expect(jwt.payload).toBeDefined();
	});
	test('Invalid token', () => {
		const input = 'abc';

		expect(() => JWT.create(input)).toThrow({
			statusCode: 400,
			message: 'Invalid token',
		} as AppError);
	});
	test('Invalid token payload', () => {
		const payload = { userId: UUID.generate() } as any;
		const jwt = JWT.generate(payload, 'secretKey');

		expect(() => jwt.validate()).toThrow({
			statusCode: 400,
			message: 'Invalid token payload',
		} as AppError);
	});
	test('Token expired', () => {
		const secretKey = 'secretKey';
		const payload = { userId: UUID.generate(), userFullName: 'John Doe' };
		const jwt = JWT.generate(payload, secretKey, { expiresIn: 0 });

		expect(() => jwt.verify(secretKey)).toThrow({
			statusCode: 401,
			message: 'Token expired',
		} as AppError);
	});
});
