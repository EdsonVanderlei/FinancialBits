import { JWT } from '../../../domain/data-objects/jwt/jwt';
import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { AppError } from '../../../shared/classes/app-error';
import { RefreshTokenUseCase } from './refresh-token.use-case';

describe('RefreshTokenUseCase', () => {
	const secretKeys = { access: 'accessSecretKey', refresh: 'refreshSecretKey' };
	let useCase: RefreshTokenUseCase;

	beforeEach(() => (useCase = new RefreshTokenUseCase(secretKeys)));

	test('Invalid token', async () => {
		const input = { refreshToken: 'acb-123' };

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Invalid token');
		});
	});
	test('Invalid signature', async () => {
		const token = JWT.generate({ userId: UUID.generate(), userFullName: 'John' }, 'refreshSecret');

		useCase.exec({ refreshToken: token.value }).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(401);
			expect(e.message).toEqual('Invalid signature');
		});
	});
	test('Success', async () => {
		const token = JWT.generate({ userId: UUID.generate(), userFullName: 'John' }, secretKeys.refresh);

		const result = await useCase.exec({ refreshToken: token.value });

		expect(result).toBeDefined()
	});
});
