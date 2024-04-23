import { SessionInMemoryRepository } from '../../repositories/session-in-memory.repository';
import { UserInMemoryRepository } from '../../repositories/user-in-memory.repository';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';
import { GenerateTokensUseCase } from '../generate-tokens/generate-tokens.use-case';
import { RegisterUserUseCase } from './register-user.use-case';

describe('RegisterUserUseCase', () => {
	test('exec', async () => {
		const userRepository = new UserInMemoryRepository();
		const sessionRepository = new SessionInMemoryRepository();

		const userService = new UserService(userRepository);
		const sessionService = new SessionService(sessionRepository);
		const generateTokensUseCase = new GenerateTokensUseCase('accessSecret', 'refreshSecret');

		const useCase = new RegisterUserUseCase(userService, sessionService, generateTokensUseCase);
		const result = await useCase.exec({
			email: 'john@doe.com',
			password: 'abc123',
			firstName: 'John',
			lastName: 'Doe',
		});

		expect(result).toBeTruthy();
	});
});
