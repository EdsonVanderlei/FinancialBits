import { AppError } from '../../../shared/classes/app-error';
import { UserInMemoryRepository } from '../../domain/repositories/user-in-memory.repository';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserValidator } from '../../domain/validator/user.validator';
import { RegisterUseCase } from './register.use-case';

describe('RegisterUseCase', () => {
	let userRepository: UserRepository;
	let userValidator: UserValidator;
	let useCase: RegisterUseCase;
	const secretKeys = { access: 'accessSecret', refresh: 'refreshSecret' };

	beforeEach(() => {
		userRepository = new UserInMemoryRepository();
		userValidator = new UserValidator();
		useCase = new RegisterUseCase(userRepository, userValidator, secretKeys);
	});

	test('Invalid email', async () => {
		const input = {
			firstName: 'John',
			email: 'test.com',
			password: 'abc123',
		};

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Invalid email');
		});
	});
	test('Password length must be greater than 4', async () => {
		const input = {
			firstName: 'John',
			email: 'test@test.com',
			password: 'ab12',
		};

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Password length must be greater than 4');
		});
	});
	test('Password length must be lower than 16', async () => {
		const input = {
			firstName: 'John',
			email: 'test@test.com',
			password: '1bc123456789101112',
		};

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Password length must be lower than 16');
		});
	});
	test('User first name is required', async () => {
		const input = {
			firstName: '',
			email: 'test@test.com',
			password: 'abc123',
		};

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('User first name is required');
		});
	});
	test('Email already in use', async () => {
		const input = {
			firstName: 'John',
			email: 'test@test.com',
			password: 'abc123',
		};
		await useCase.exec(input);

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Email already in use');
		});
	});
	test('Success', async () => {
		const input = {
			firstName: 'John',
			email: 'test@test.com',
			password: 'abc123',
		};
		const result = await useCase.exec(input);

		expect(result).toBeDefined();
		expect(result.user.firstName).toEqual(input.firstName);
		expect(result.user.email).toEqual(input.email);
	});
});
