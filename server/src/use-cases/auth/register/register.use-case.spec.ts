import { SessionInMemoryRepository } from '../../../domain/repositories/session/in-memory/session-in-memory.repository';
import { UserInMemoryRepository } from '../../../domain/repositories/user/in-memory/user-in-memory.repository';
import { CreateUserValidator } from '../../../domain/validator/user/create-user.validator';
import { RegisterUseCase } from './register.use-case';

describe('RegisterUseCase', () => {
	test('exec', async () => {
		const userRepository = new UserInMemoryRepository();
		const sessionRepository = new SessionInMemoryRepository();
		const createUserValidator = new CreateUserValidator();
		const secretKeys = { access: 'accessSecret', refresh: 'refreshSecret' };
		const useCase = new RegisterUseCase(userRepository, sessionRepository, createUserValidator, secretKeys);

		const result = await useCase.exec({
			email: 'john@doe.com',
			password: 'abc123',
			firstName: 'John',
			lastName: 'Doe',
		});

		expect(result).toBeTruthy();
	});
});
