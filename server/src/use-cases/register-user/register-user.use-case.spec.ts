import { SessionInMemoryRepository } from '../../domain/repositories/in-memory/session/session-in-memory.repository';
import { UserInMemoryRepository } from '../../domain/repositories/in-memory/user/user-in-memory.repository';
import { GenerateTokensUseCase } from '../generate-tokens/generate-tokens.use-case';
import { RegisterUserUseCase } from './register-user.use-case';

describe('RegisterUserUseCase', () => {
	test('exec', async () => {
		const userRepository = new UserInMemoryRepository();
		const sessionRepository = new SessionInMemoryRepository();
		const generateTokensUseCase = new GenerateTokensUseCase('accessSecret', 'refreshSecret');

		const useCase = new RegisterUserUseCase(
			userRepository,
			sessionRepository,
			generateTokensUseCase
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
