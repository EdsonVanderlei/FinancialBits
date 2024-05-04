import { SessionInMemoryRepository } from '../../../domain/repositories/in-memory/session/session-in-memory.repository';
import { UserInMemoryRepository } from '../../../domain/repositories/in-memory/user/user-in-memory.repository';
import { RegisterUserUseCase } from './register-user.use-case';

describe('RegisterUserUseCase', () => {
	test('exec', async () => {
		const userRepository = new UserInMemoryRepository();
		const sessionRepository = new SessionInMemoryRepository();

		const useCase = new RegisterUserUseCase('accessSecret', 'refreshSecret', userRepository, sessionRepository);

		const result = await useCase.exec({
			email: 'john@doe.com',
			password: 'abc123',
			firstName: 'John',
			lastName: 'Doe',
		});

		expect(result).toBeTruthy();
	});
});
