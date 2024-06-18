import { Email } from '../../../data-objects/email/email';
import { Password } from '../../../data-objects/password/password';
import { User } from '../../../entities/user/user';
import { UserInMemoryRepository } from './user-in-memory.repository';

describe('UserInMemoryRepository', () => {
	let repository: UserInMemoryRepository;
	const user = User.create({
		firstName: 'John',
		email: Email.create('test@test.com'),
		password: Password.create('abc123'),
	});
	beforeEach(() => (repository = new UserInMemoryRepository()));

	test('create', async () => {
		const result = await repository.create(user);

		expect(result).toMatchObject(user);
	});
	test('find by email', async () => {
		await repository.create(user);
		const result = await repository.findByEmail(user.email);

		expect(result).toMatchObject(user);
	});
	test('find by email null', async () => {
		const result = await repository.findByEmail(user.email);

		expect(result).toEqual(null);
	});
});
