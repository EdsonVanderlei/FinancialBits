import { ServerError } from '../../core/server-error';
import { User } from '../../entities/user';
import { SessionInMemoryRepository } from '../../repositories/session-in-memory-repository';
import { UserInMemoryRepository } from '../../repositories/user-in-memory-repository';
import { PasswordUtils } from '../../utils/password/password.utils';
import { FindUserUseCase } from '../find-user/find-user-use-case';
import { GenerateTokensUseCase } from '../generate-tokens/generate-tokens-use-case';
import { SaveSessionUseCase } from '../save-session/save-session-use-case';
import { LoginUseCase } from './login-use-case';

const getUser = async (hashPassword: boolean) => {
	const user = {
		email: 'john@doe.com',
		password: 'abc123',
		firstName: 'John',
		lastName: 'Doe',
	};
	if (hashPassword) user.password = await PasswordUtils.hash(user.password);
	return user;
};

const getUseCase = async (user?: Omit<User, 'id'>) => {
	const userRepository = new UserInMemoryRepository();
	const sessionRepository = new SessionInMemoryRepository();

	const findUserUseCase = new FindUserUseCase(userRepository);
	const generateTokensUseCase = new GenerateTokensUseCase('accessSecret', 'refreshSecret');
	const saveSessionUseCase = new SaveSessionUseCase(sessionRepository);

	if (!!user) await userRepository.create(user);

	return new LoginUseCase(findUserUseCase, generateTokensUseCase, saveSessionUseCase);
};

describe('LoginUseCase tests', () => {
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
			expect(e).toBeInstanceOf(ServerError);
			expect(e.code).toEqual(400);
			expect(e.message).toEqual('invalid credentials');
		});
	});
});
