import { Email } from '../../../domain/data-objects/email/email';
import { JWT } from '../../../domain/data-objects/jwt/jwt';
import { Password } from '../../../domain/data-objects/password/password';
import { SessionInMemoryRepository } from '../../../domain/repositories/in-memory/session/session-in-memory.repository';
import { UserInMemoryRepository } from '../../../domain/repositories/in-memory/user/user-in-memory.repository';
import { LogoutUserUseCase } from './logout-user.use-case';

describe('LogoutUserUseCase', () => {
	test('exec', async () => {
		const userRepository = new UserInMemoryRepository();
		const sessionRepository = new SessionInMemoryRepository();
		const useCase = new LogoutUserUseCase(userRepository, sessionRepository);

		const user = await userRepository.create({
			email: new Email('john@doe.com'),
			password: new Password('abc123'),
			firstName: 'John',
			lastName: 'Doe',
		});
		await sessionRepository.create({
			refreshToken: new JWT(
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
			),
			userId: user.id!,
		});

		await useCase.exec({ email: user.email.value });
		const result = await sessionRepository.exists({ userId: user.id! });

		expect(result).toBe(false);
	});
});
