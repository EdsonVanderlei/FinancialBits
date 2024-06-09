import { Email } from '../../data-objects/email/email';
import { Password } from '../../data-objects/password/password';
import { Timestamps } from '../../data-objects/timestamps/timestamps';
import { UUID } from '../../data-objects/uuid/uuid';
import { User } from './user';

describe('User', () => {
	const input = {
		id: '2b558e4f-d281-4b54-9710-50c52c647e5d',
		email: 'email@test.com',
		password: 'abc123',
		firstName: 'John',
		lastName: 'Doe',
		fullName: 'John Doe',
		createdAt: new Date(),
	};
	test('Create', () => {
		const user = User.create({
			email: Email.create(input.email),
			password: Password.create(input.password),
			firstName: input.firstName,
			lastName: input.lastName,
		});

		expect(user.id).toBeDefined();
		expect(user.email.value).toEqual(input.email);
		expect(user.password.value).not.toEqual(input.password);
		expect(user.firstName).toEqual(input.firstName);
		expect(user.lastName).toEqual(input.lastName);
		expect(user.fullName).toEqual(input.fullName);
		expect(user.timestamps).toBeDefined();
	});
	test('load', () => {
		const user = User.load({
			id: UUID.create(input.id),
			email: Email.create(input.email),
			password: Password.create(input.password),
			firstName: input.firstName,
			lastName: input.lastName,
			timestamps: Timestamps.create({ createdAt: input.createdAt }),
		});

		expect(user.id.value).toEqual(input.id);
		expect(user.email.value).toEqual(input.email);
		expect(user.password.value).not.toEqual(input.password);
		expect(user.firstName).toEqual(input.firstName);
		expect(user.lastName).toEqual(input.lastName);
		expect(user.fullName).toEqual(input.fullName);
		expect(user.timestamps.value.createdAt.getTime()).toEqual(input.createdAt.getTime());
	});
});
