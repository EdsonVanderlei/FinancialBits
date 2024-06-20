import { AppError } from '../../../shared/classes/app-error';
import { Email } from '../../domain/data-objects/email/email';
import { Password } from '../../domain/data-objects/password/password';
import { User } from '../../domain/entities/user';
import { UserInMemoryRepository } from '../../domain/repositories/user-in-memory.repository';
import { UserRepository } from '../../domain/repositories/user.repository';
import { LoginUseCase } from './login.use-case';

describe('LoginUseCase', () => {
	let userRepository: UserRepository;
	let useCase: LoginUseCase;
	const secretKeys = { access: 'accessSecret', refresh: 'refreshSecret' };

	beforeEach(() => {
		userRepository = new UserInMemoryRepository();
		useCase = new LoginUseCase(userRepository, secretKeys);
	});

	test('Invalid email', async () => {
		const input = { email: 'test.com', password: 'abc123' };

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Invalid email');
		});
	});
	test('User not found', async () => {
		const password = 'abc123';
		const user = User.create({
			firstName: 'John',
			email: Email.create('test@test.com'),
			password: Password.create(password),
		});
		await userRepository.create(user);
		const input = { email: 'test1@test.com', password };

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(404);
			expect(e.message).toEqual('User not found');
		});
	});
	test('Invalid password', async () => {
		const password = 'abc123';
		const user = User.create({
			firstName: 'John',
			email: Email.create('test@test.com'),
			password: Password.create(password),
		});
		await userRepository.create(user);
		const input = { email: user.email.value, password: 'abcd1234' };

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(401);
			expect(e.message).toEqual('Invalid password');
		});
	});
	test('Success', async () => {
		const password = 'abc123';
		const user = User.create({
			firstName: 'John',
			email: Email.create('test@test.com'),
			password: Password.create('abc123'),
		});
		await userRepository.create(user);
		const input = { email: user.email.value, password };

		const result = await useCase.exec(input);

		expect(result).toBeDefined();
		expect(result.user.id).toEqual(user.id.value);
		expect(result.user.email).toEqual(user.email.value);
		expect(result.user.firstName).toEqual(user.firstName);
	});
});
