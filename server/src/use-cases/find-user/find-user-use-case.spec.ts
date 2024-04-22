import { ServerError } from '../../core/server-error';
import { User } from '../../entities/user';
import { UserInMemoryRepository } from '../../repositories/user-in-memory-repository';
import { FindUserUseCase } from './find-user-use-case';

const getUser = (replace?: Partial<User>) =>
	({
		email: 'john@doe.com',
		password: 'abc123',
		firstName: 'John',
		lastName: 'Doe',
		...replace,
	} as User);

describe('FindUserUseCase tests', () => {
	test('find by id', async () => {
		const repository = new UserInMemoryRepository();
		const useCase = new FindUserUseCase(repository);

		let user = getUser();
		user = await repository.create(user);

		const result = await useCase.exec({ id: user.id });

		expect(result).toEqual(user);
	});

	test('find by email', async () => {
		const repository = new UserInMemoryRepository();
		const useCase = new FindUserUseCase(repository);

		let user = getUser();
		user = await repository.create(user);

		const result = await useCase.exec({ email: user.email });

		expect(result).toEqual(user);
	});

	test('no parameters', async () => {
		const repository = new UserInMemoryRepository();
		const useCase = new FindUserUseCase(repository);

		let user = getUser();
		user = await repository.create(user);

		useCase.exec({}).catch(e => {
			expect(e).toBeInstanceOf(ServerError);
			expect(e.code).toEqual(400);
			expect(e.message).toEqual('no parameters were provided');
		});
	});

	test('invalid userId', async () => {
		const repository = new UserInMemoryRepository();
		const useCase = new FindUserUseCase(repository);

		let user = getUser();
		user = await repository.create(user);

		useCase.exec({ id: '123' }).catch(e => {
			expect(e).toBeInstanceOf(ServerError);
			expect(e.code).toEqual(400);
			expect(e.message).toEqual('invalid user identifier');
		});
	});

	test('invalid email', async () => {
		const repository = new UserInMemoryRepository();
		const useCase = new FindUserUseCase(repository);

		let user = getUser();
		user = await repository.create(user);

		useCase.exec({ email: 'www.test.com' }).catch(e => {
			expect(e).toBeInstanceOf(ServerError);
			expect(e.code).toEqual(400);
			expect(e.message).toEqual('invalid email');
		});
	});

	test('user not found', async () => {
		const repository = new UserInMemoryRepository();
		const useCase = new FindUserUseCase(repository);

		let user = getUser();
		user = await repository.create(user);

		useCase.exec({ email: 'johndoe@test.com' }).catch(e => {
			expect(e).toBeInstanceOf(ServerError);
			expect(e.code).toEqual(404);
			expect(e.message).toEqual('user not found');
		});
	});
});
