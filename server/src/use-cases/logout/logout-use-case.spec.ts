import { User } from '../../entities/user';
import { SessionInMemoryRepository } from '../../repositories/session-in-memory-repository';
import { UserInMemoryRepository } from '../../repositories/user-in-memory-repository';
import { PasswordUtils } from '../../utils/password/password.utils';
import { DeleteSessionUseCase } from '../delete-session/delete-session-use-case';
import { FindUserUseCase } from '../find-user/find-user-use-case';
import { LogoutUseCase } from './logout-use-case';

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
	const deleteSessionUseCase = new DeleteSessionUseCase(sessionRepository);

	if (!!user) {
		const result = await userRepository.create(user);
		await sessionRepository.create({
			userId: result.id!,
			refreshToken: 'refreshToken',
		});
	}

	return new LogoutUseCase(findUserUseCase, deleteSessionUseCase);
};

describe('LogoutUseCase tests', () => {
	test('exec', async () => {
		const user = await getUser(true);
		const useCase = await getUseCase(user);

		const result = await useCase.exec({ email: user.email });

		expect(result).toBeTruthy();
	});
});
