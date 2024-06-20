import { AppError } from '../../../shared/classes/app-error';
import { UUID } from '../../../shared/domain/data-objects/uuid/uuid';
import { Email } from '../../domain/data-objects/email/email';
import { JWT } from '../../domain/data-objects/jwt/jwt';
import { Password } from '../../domain/data-objects/password/password';
import { User } from '../../domain/entities/user';
import { UserInMemoryRepository } from '../../domain/repositories/user-in-memory.repository';
import { RefreshTokenUseCase } from './refresh-token.use-case';

describe('RefreshTokenUseCase', () => {
	const secretKeys = { access: 'accessSecretKey', refresh: 'refreshSecretKey' };
	let useCase: RefreshTokenUseCase;
	const userRepository = new UserInMemoryRepository();

	beforeEach(() => (useCase = new RefreshTokenUseCase(userRepository, secretKeys)));

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
	test('User not found', async () => {
		const token = JWT.generate({ userId: UUID.generate(), userFullName: 'John' }, secretKeys.refresh);

		useCase.exec({ refreshToken: token.value }).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(404);
			expect(e.message).toEqual('User not found');
		});
	});
	test('Success', async () => {
		const user = User.create({
			firstName: 'John',
			email: Email.create('email@test.com'),
			password: Password.create('abc123'),
		});
		const token = JWT.generate({ userId: user.id, userFullName: 'John' }, secretKeys.refresh);
		await userRepository.create(user);

		const result = await useCase.exec({ refreshToken: token.value });

		expect(result).toBeDefined();
	});
});
