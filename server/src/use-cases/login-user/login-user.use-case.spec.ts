import { Email } from '../../domain/data-objects/email/email';
import { Password } from '../../domain/data-objects/password/password';
import { User } from '../../domain/entities/user/user';
import { SessionInMemoryRepository } from '../../domain/repositories/in-memory/session/session-in-memory.repository';
import { UserInMemoryRepository } from '../../domain/repositories/in-memory/user/user-in-memory.repository';
import { AppError } from '../../shared/classes/app-error';
import { LoginUserUseCase } from './login-user.use-case';

describe('LoginUserUseCase', () => {
	let user: User;
	const password = 'abc123';
	let useCase: LoginUserUseCase;
	let userRepository: UserInMemoryRepository;

	beforeEach(() => {
		userRepository = new UserInMemoryRepository();
		const sessionRepository = new SessionInMemoryRepository();

		user = User.create({
			email: new Email('john@doe.com'),
			password: new Password(password),
			firstName: 'John',
			lastName: 'Doe',
		});

		useCase = new LoginUserUseCase('accessSecret', 'refreshSecret', userRepository, sessionRepository);
	});

	test('exec', async () => {
		await userRepository.create(user);

		const result = await useCase.exec({
			email: user.email.value,
			password,
		});

		expect(result).toBeTruthy();
	});

	test('invalid email', async () => {
		await userRepository.create(user);

		useCase.exec({ email: 'johndoe@test.com', password: password }).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Invalid credentials');
		});
	});

	test('invalid password', async () => {
		await userRepository.create(user);

		useCase.exec({ email: user.email.value, password: '123456' }).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Invalid credentials');
		});
	});

	test('user not found', async () => {
		useCase.exec({ email: user.email.value, password: user.password.value }).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Invalid credentials');
		});
	});
});
