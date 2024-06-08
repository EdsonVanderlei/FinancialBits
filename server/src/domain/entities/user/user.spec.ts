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
	test('create', () => {
		const user = User.create({
			email: new Email(input.email),
			password: new Password(input.password),
			firstName: input.firstName,
			lastName: input.lastName,
		});

		expect(input.email).toEqual(user.email.value);
		expect(input.password).toEqual(user.password.value);
		expect(input.firstName).toEqual(user.firstName);
		expect(input.lastName).toEqual(user.lastName);
		expect(input.fullName).toEqual(user.fullName);
	});
	test('load', () => {
		const user = User.load({
			id: new UUID(input.id),
			email: new Email(input.email),
			password: new Password(input.password),
			firstName: input.firstName,
			lastName: input.lastName,
			timestamps: new Timestamps(input.createdAt),
		});

		expect(input.id).toEqual(user.id.value);
		expect(input.email).toEqual(user.email.value);
		expect(input.password).toEqual(user.password.value);
		expect(input.firstName).toEqual(user.firstName);
		expect(input.lastName).toEqual(user.lastName);
		expect(input.fullName).toEqual(user.fullName);
		expect(input.createdAt.getTime()).toEqual(user.timestamps.value.createdAt.getTime());
	});
});
