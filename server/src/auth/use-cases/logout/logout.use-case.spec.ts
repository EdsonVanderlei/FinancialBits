import { AppError } from '../../../shared/classes/app-error';
import { UUID } from '../../../shared/domain/data-objects/uuid/uuid';
import { JWT } from '../../domain/data-objects/jwt/jwt';
import { SessionInMemoryRepository } from '../../domain/repositories/session/in-memory/session-in-memory.repository';
import { SessionRepository } from '../../domain/repositories/session/session.repository';
import { LogoutUseCase } from './logout.use-case';

describe('LogoutUseCase', () => {
	const refreshSecretKey = 'refreshSecretKey';
	let sessionRepository: SessionRepository;
	let useCase: LogoutUseCase;

	beforeEach(() => {
		sessionRepository = new SessionInMemoryRepository();
		useCase = new LogoutUseCase(sessionRepository, refreshSecretKey);
	});

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
		const token = JWT.generate({ userId: UUID.generate(), userFullName: 'John' }, refreshSecretKey);

		await useCase.exec({ refreshToken: token.value });

		expect(true).toBeTruthy();
	});
});
