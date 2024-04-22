import { SessionInMemoryRepository } from '../../repositories/session-in-memory-repository';
import { UserInMemoryRepository } from '../../repositories/user-in-memory-repository';
import { CreateUserUseCase } from '../create-user/create-user-use-case';
import { GenerateTokensUseCase } from '../generate-tokens/generate-tokens-use-case';
import { SaveSessionUseCase } from '../save-session/save-session-use-case';
import { RegisterUseCase } from './register-use-case';

describe('RegisterUseCase tests', () => {
	test('exec', async () => {
		const userRepository = new UserInMemoryRepository();
		const sessionRepository = new SessionInMemoryRepository();

		const createUserUseCase = new CreateUserUseCase(userRepository);
		const generateTokensUseCase = new GenerateTokensUseCase('accessSecret', 'refreshSecret');
		const saveSessionUseCase = new SaveSessionUseCase(sessionRepository);

		const useCase = new RegisterUseCase(
			createUserUseCase,
			generateTokensUseCase,
			saveSessionUseCase
		);
		const result = await useCase.exec({
			email: 'john@doe.com',
			password: 'abc123',
			firstName: 'John',
			lastName: 'Doe',
		});

		expect(result).toBeTruthy();
	});
});
