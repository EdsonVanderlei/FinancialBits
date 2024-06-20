import { Email } from '../data-objects/email/email';
import { Password } from '../data-objects/password/password';
import { User } from '../entities/user';
import { UserRepository } from './user.repository';

export const UserRepositorySpecBase = {
	create: async (repository: UserRepository) => {
		const user = User.create({
			firstName: 'John',
			email: Email.create('test@test.com'),
			password: Password.create('abc123'),
		});
		const result = await repository.create(user);

		expect(result).toMatchObject(user);
	},
	findByEmail: async (repository: UserRepository) => {
		const user = User.create({
			firstName: 'John',
			email: Email.create('test@test.com'),
			password: Password.create('abc123'),
		});
		await repository.create(user);
		const result = await repository.findByEmail(user.email);

		expect(result).toMatchObject(user);
	},
	findByEmailNull: async (repository: UserRepository) => {
		const user = User.create({
			firstName: 'John',
			email: Email.create('test@test.com'),
			password: Password.create('abc123'),
		});
		const result = await repository.findByEmail(user.email);

		expect(result).toEqual(null);
	},
	findById: async (repository: UserRepository) => {
		const user = User.create({
			firstName: 'John',
			email: Email.create('test@test.com'),
			password: Password.create('abc123'),
		});
		await repository.create(user);
		const result = await repository.findById(user.id);

		expect(result).toMatchObject(user);
	},
	findByIdNull: async (repository: UserRepository) => {
		const user = User.create({
			firstName: 'John',
			email: Email.create('test@test.com'),
			password: Password.create('abc123'),
		});
		const result = await repository.findById(user.id);

		expect(result).toEqual(null);
	},
};
