import { ServerError } from '../../core/server-error';
import { User } from '../../entities/user';
import { UserInMemoryRepository } from '../../repositories/user-in-memory-repository';
import { CreateUserUseCase } from './create-user-use-case';

const getUseCase = () => {
	const repository = new UserInMemoryRepository();
	return new CreateUserUseCase(repository);
};

const getUser = (replace?: Partial<User>) =>
	({
		email: 'john@doe.com',
		password: 'abc123',
		firstName: 'John',
		lastName: 'Doe',
		...replace,
	} as User);

describe('CreateUserUseCase tests', () => {
	test('create', async () => {
		const useCase = getUseCase();
		const user = getUser();

		const result = await useCase.exec(user);

		expect(result).toBeInstanceOf(User);
	});

	test('low length password', async () => {
		const useCase = getUseCase();
		const user = getUser({ password: 'ab12' });

		useCase.exec(user).catch(err => {
			expect(err).toBeInstanceOf(ServerError);

			expect(err.code).toBe(400);
			expect(err.message).toEqual('password length must be greater than 4');
		});
	});

	test('high length password', async () => {
		const useCase = getUseCase();
		const user = getUser({ password: 'abcdefgh12345678' });

		useCase.exec(user).catch(err => {
			expect(err).toBeInstanceOf(ServerError);

			expect(err.code).toBe(400);
			expect(err.message).toEqual('password length must be lower than 16');
		});
	});

	test('invalid email', async () => {
		const useCase = getUseCase();
		const user = getUser({ email: 'www.test.com' });

		useCase.exec(user).catch(err => {
			expect(err).toBeInstanceOf(ServerError);

			expect(err.code).toBe(400);
			expect(err.message).toEqual('invalid email');
		});
	});

	test('email already in use', async () => {
		const useCase = getUseCase();
		const user = getUser();
		await useCase.exec(user);

		useCase.exec(user).catch(err => {
			expect(err).toBeInstanceOf(ServerError);

			expect(err.code).toBe(400);
			expect(err.message).toEqual('email already in use');
		});
	});
});
