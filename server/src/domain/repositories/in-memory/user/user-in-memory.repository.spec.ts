import { Email } from '../../../data-objects/email/email';
import { UUID } from '../../../data-objects/uuid/uuid';
import { User } from '../../../entities/user/user';
import { LoadUserProps } from '../../../types/user/load-user-props';
import { UserInMemoryRepository } from './user-in-memory.repository';

const getUser = (replace?: Partial<LoadUserProps>) =>
	({
		email: 'johndoe@test.com',
		password: 'abc123',
		firstName: 'John',
		lastName: 'Doe',
		...replace,
	} as LoadUserProps);

describe('UserInMemoryRepository', () => {
	let repository: UserInMemoryRepository;

	beforeEach(() => {
		repository = new UserInMemoryRepository();
	});

	test('findAll', async () => {
		const user = await repository.create(getUser());

		expect(await repository.findAll()).toContainEqual(user);
	});

	test('findById', async () => {
		const user = await repository.create(getUser());

		expect(await repository.findOne({ id: user.id })).toEqual(user);
		expect(await repository.findOne({ id: new UUID('', false) })).toBeFalsy();
	});

	test('create', async () => {
		const user = await repository.create(getUser());

		expect(user).toBeInstanceOf(User);
	});

	test('update', async () => {
		const user = await repository.create(getUser());

		const newUser = await repository.update(
			getUser({ email: new Email('john@test.com'), id: user.id })
		);

		expect(newUser?.email.value).toEqual('john@test.com');
		expect(newUser?.id?.value === user.id?.value).toBe(true);
		expect(await repository.findAll()).not.toContainEqual(user);
	});

	test('delete', async () => {
		const user = await repository.create(getUser());
		const { deleteCount } = await repository.delete({ id: user.id });

		expect(deleteCount).toEqual(1);
		expect(await repository.findAll()).not.toContainEqual(user);
	});
});
