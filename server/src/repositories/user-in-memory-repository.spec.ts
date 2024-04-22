import { User } from '../entities/user';
import { ValidationUtils } from '../utils/validation/validation.utils';
import { UserInMemoryRepository } from './user-in-memory-repository';

const getUser = (replace?: Partial<User>) =>
	({
		email: 'johndoe@test.com',
		password: '123',
		firstName: 'John',
		lastName: 'Doe',
		...replace,
	} as User);

describe('UserInMemoryRepository tests', () => {
	test('findAll', async () => {
		const repository = new UserInMemoryRepository();
		const user = await repository.create(getUser());

		expect(await repository.findAll()).toContainEqual(user);
	});

	test('findById', async () => {
		const repository = new UserInMemoryRepository();
		const user = await repository.create(getUser());

		expect(await repository.findOne({ id: '' })).toEqual(null);
		expect(await repository.findOne({ id: user.id })).toEqual(user);
	});

	test('create', async () => {
		const repository = new UserInMemoryRepository();
		const user = await repository.create(getUser());

		expect(user).toBeInstanceOf(User);
		expect(ValidationUtils.uuid(user.id)).toBe(true);
	});

	test('update', async () => {
		const repository = new UserInMemoryRepository();
		const user = await repository.create(getUser());

		const newUser = await repository.update(getUser({ email: 'john@test.com', id: user.id }));

		expect(newUser?.id === user.id).toBe(true);
		expect(newUser?.email).toEqual('john@test.com');
		expect(await repository.findAll()).not.toContainEqual(user);
	});

	test('delete', async () => {
		const repository = new UserInMemoryRepository();
		const user = await repository.create(getUser());
		const deletedUser = await repository.delete({ id: user.id });

		expect(deletedUser).toEqual(user);
		expect(await repository.findAll()).not.toContainEqual(user);
	});
});
