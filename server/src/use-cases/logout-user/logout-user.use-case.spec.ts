import { User } from '../../domain/entities/user/user';
import { SessionInMemoryRepository } from '../../domain/repositories/in-memory/session/session-in-memory.repository';
import { UserInMemoryRepository } from '../../domain/repositories/in-memory/user/user-in-memory.repository';
import { PasswordUtils } from '../../shared/utils/password/password.utils';
import { LogoutUserUseCase } from './logout-user.use-case';

const getUser = async (hashPassword: boolean) => {
	const user = {
		email: 'john@doe.com',
		password: 'abc123',
		firstName: 'John',
		lastName: 'Doe',
	};
	if (hashPassword) user.password = await PasswordUtils.hash(user.password);
	return user as User;
};

const getUseCase = async (user?: Omit<User, 'id'>) => {
	const userRepository = new UserInMemoryRepository();
	const sessionRepository = new SessionInMemoryRepository();

	if (!!user) {
		const result = await userRepository.create(user);
		await sessionRepository.create({
			userId: result.id!,
			refreshToken: 'refreshToken',
		});
	}

	return new LogoutUserUseCase(userRepository, sessionRepository);
};

describe('LogoutUserUseCase', () => {
	test('exec', async () => {
		const userRepository = new UserInMemoryRepository();
		const sessionRepository = new SessionInMemoryRepository();
		const useCase = new LogoutUserUseCase(userRepository, sessionRepository);

		const user = await userRepository.create({
			email: 'john@doe.com',
			password: 'abc123',
			firstName: 'John',
			lastName: 'Doe',
		});

		await sessionRepository.create({ refreshToken: 'token', userId: user.id! });
		await useCase.exec({ email: user.email });

		const result = await sessionRepository.exists({ userId: user.id! });
		
		expect(result).toBe(false);
	});
});
