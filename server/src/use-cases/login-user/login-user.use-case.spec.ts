import { User } from '../../domain/entities/user/user';
import { SessionInMemoryRepository } from '../../domain/repositories/in-memory/session/session-in-memory.repository';
import { UserInMemoryRepository } from '../../domain/repositories/in-memory/user/user-in-memory.repository';
import { PasswordUtils } from '../../shared/utils/password/password.utils';
import { GenerateTokensUseCase } from '../generate-tokens/generate-tokens.use-case';
import { LoginUserUseCase } from './login-user.use-case';

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
	const generateTokensUseCase = new GenerateTokensUseCase('accessSecret', 'refreshSecret');

	if (!!user) await userRepository.create(user);

	return new LoginUserUseCase(userRepository, sessionRepository, generateTokensUseCase);
};

describe('LoginUserUseCase', () => {
	test('exec', async () => {
		const user = await getUser(true);
		const useCase = await getUseCase(user);

		const result = await useCase.exec({
			email: 'john@doe.com',
			password: 'abc123',
		});

		expect(result).toBeTruthy();
	});
	test('invalid credentials', async () => {
		const user = await getUser(true);
		const useCase = await getUseCase(user);

		useCase.exec({ email: 'john@doe.com', password: 'abc1234' }).catch(e => {
			expect(e).toBeInstanceOf(Error);
		});
	});
});
