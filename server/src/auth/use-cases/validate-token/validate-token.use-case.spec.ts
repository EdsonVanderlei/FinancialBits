import { AppError } from '../../../shared/classes/app-error';
import { UUID } from '../../../shared/domain/data-objects/uuid/uuid';
import { JWT } from '../../domain/data-objects/jwt/jwt';
import { ValidateTokenUseCase } from './validate-token.use-case';

describe('ValidateTokenUseCase', () => {
	const accessSecretKey = 'accessSecretKey';
	let useCase: ValidateTokenUseCase;

	beforeEach(() => (useCase = new ValidateTokenUseCase(accessSecretKey)));

	test('Invalid token', () => {
		const input = { refreshToken: 'acb-123' };

		expect(() => useCase.exec(input)).toThrow({
			statusCode: 401,
			message: 'Invalid token',
		} as AppError);
	});
	test('Invalid signature', () => {
		const token = JWT.generate({ userId: UUID.generate(), userFullName: 'John' }, 'refreshSecret');

		expect(() => useCase.exec({ refreshToken: token.value })).toThrow({
			statusCode: 401,
			message: 'Invalid signature',
		} as AppError);
	});
	test('Token expired', () => {
		const token = JWT.generate({ userId: UUID.generate(), userFullName: 'John' }, accessSecretKey, { expiresIn: 0 });

		expect(() => useCase.exec({ refreshToken: token.value })).toThrow({
			statusCode: 401,
			message: 'Token expired',
		} as AppError);
	});
	test('Success', () => {
		const userFullName = 'John';
		const userId = UUID.generate();
		const token = JWT.generate({ userId, userFullName }, accessSecretKey);

		const result = useCase.exec({ refreshToken: token.value });

		expect(result.userId).toEqual(userId.value);
		expect(result.userFullName).toEqual(userFullName);
	});
});
