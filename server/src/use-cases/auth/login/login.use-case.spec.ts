import { Email } from '../../../domain/data-objects/email/email';
import { Password } from '../../../domain/data-objects/password/password';
import { User } from '../../../domain/entities/user/user';
import { SessionInMemoryRepository } from '../../../domain/repositories/session/in-memory/session-in-memory.repository';
import { UserInMemoryRepository } from '../../../domain/repositories/user/in-memory/user-in-memory.repository';
import { LoginUseCase } from './login.use-case';

describe('LoginUseCase', () => {
	test('exec', async () => {
		const password = 'abc123';
		let user = User.create({
			email: Email.create('john@doe.com'),
			password: Password.create(password),
			firstName: 'John',
			lastName: 'Doe',
		});

		const userRepository = new UserInMemoryRepository();
		const sessionRepository = new SessionInMemoryRepository();
		const secretKeys = { access: 'accessSecret', refresh: 'refreshSecret' };
		const useCase = new LoginUseCase(userRepository, sessionRepository, secretKeys);

		await userRepository.create(user);
		const result = await useCase.exec({ email: user.email.value, password });

		expect(result).toBeTruthy();
	});
});
