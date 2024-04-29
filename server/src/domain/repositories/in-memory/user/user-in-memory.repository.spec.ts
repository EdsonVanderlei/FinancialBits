import { Email } from '../../../data-objects/email/email';
import { Password } from '../../../data-objects/password/password';
import { UUID } from '../../../data-objects/uuid/uuid';
import { User } from '../../../entities/user/user';
import { UserInMemoryRepository } from './user-in-memory.repository';

const getUser = (replace?: Partial<User>) =>
	({
		email: new Email('johndoe@test.com'),
		password: new Password('abc123'),
		firstName: 'John',
		lastName: 'Doe',
		...replace,
	} as User);

describe('UserInMemoryRepository', () => {
	test('findAll', async () => {
		const repository = new UserInMemoryRepository();
		const user = await repository.create(getUser());

		expect(await repository.findAll()).toContainEqual(user);
	});

	test('findById', async () => {
		const repository = new UserInMemoryRepository();
		const user = await repository.create(getUser());

		expect(await repository.findOne({ id: user.id })).toEqual(user);
		expect(await repository.findOne({ id: new UUID('', false) })).toEqual(null);
	});

	test('create', async () => {
		const repository = new UserInMemoryRepository();
		const user = await repository.create(getUser());

		expect(user).toBeInstanceOf(User);
	});

	test('update', async () => {
		const repository = new UserInMemoryRepository();
		const user = await repository.create(getUser());

		const newUser = await repository.update(
			getUser({ email: new Email('john@test.com'), id: user.id })
		);

		expect(newUser?.id === user.id).toBe(true);
		expect(newUser?.email).toEqual('john@test.com');
		expect(await repository.findAll()).not.toContainEqual(user);
	});

	test('delete', async () => {
		const repository = new UserInMemoryRepository();
		const user = await repository.create(getUser());
		const { deleteCount } = await repository.delete({ id: user.id });

		expect(deleteCount).toEqual(1);
		expect(await repository.findAll()).not.toContainEqual(user);
	});
});
