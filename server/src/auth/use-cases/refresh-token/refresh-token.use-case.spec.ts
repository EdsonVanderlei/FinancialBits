import { AppError } from '../../../shared/classes/app-error';
import { UUID } from '../../../shared/domain/data-objects/uuid/uuid';
import { JWT } from '../../domain/data-objects/jwt/jwt';
import { Session } from '../../domain/entities/session/session';
import { SessionInMemoryRepository } from '../../domain/repositories/session/session-in-memory.repository';
import { RefreshTokenUseCase } from './refresh-token.use-case';

describe('RefreshTokenUseCase', () => {
	const secretKeys = { access: 'accessSecretKey', refresh: 'refreshSecretKey' };
	let useCase: RefreshTokenUseCase;
	const sessionRepository = new SessionInMemoryRepository();

	beforeEach(() => (useCase = new RefreshTokenUseCase(sessionRepository, secretKeys)));

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
	test('Session not found', async () => {
		const token = JWT.generate({ userId: UUID.generate(), userFullName: 'John' }, secretKeys.refresh);

		useCase.exec({ refreshToken: token.value }).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(404);
			expect(e.message).toEqual('Session not found');
		});
	});
	test('Success', async () => {
		const userId = UUID.generate();
		const token = JWT.generate({ userId, userFullName: 'John' }, secretKeys.refresh);
		await sessionRepository.create(
			Session.create({
				userId,
				refreshToken: token,
			}),
		);

		const result = await useCase.exec({ refreshToken: token.value });

		expect(result).toBeDefined();
	});
});
