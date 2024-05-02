import { Email } from '../../data-objects/email/email';
import { Password } from '../../data-objects/password/password';
import { UUID } from '../../data-objects/uuid/uuid';
import { User } from './user';

describe('User', () => {
	let input: {
		id: string;
		email: string;
		password: string;
		firstName: string;
		lastName: string;
		fullName: string;
	};
	beforeAll(
		() =>
			(input = {
				id: '2b558e4f-d281-4b54-9710-50c52c647e5d',
				email: 'email@test.com',
				password: 'abc123',
				firstName: 'John',
				lastName: 'Doe',
				fullName: 'John Doe',
			})
	);

	test('create', () => {
		const user = User.create({
			email: new Email(input.email),
			password: new Password(input.password),
			firstName: input.firstName,
			lastName: input.lastName,
		});

		expect(input.email === user.email.value).toBeTruthy();
		expect(input.password === user.password.value).toBeFalsy();
		expect(input.firstName === user.firstName).toBeTruthy();
		expect(input.lastName === user.lastName).toBeTruthy();
		expect(input.fullName === user.fullName).toBeTruthy();
	});
	test('load', () => {
		const user = User.load({
			id: new UUID(input.id),
			email: new Email(input.email),
			password: new Password(input.password, true, false),
			firstName: input.firstName,
			lastName: input.lastName,
		});

		expect(input.id === user.id?.value).toBeTruthy();
		expect(input.email === user.email.value).toBeTruthy();
		expect(input.password === user.password.value).toBeTruthy();
		expect(input.firstName === user.firstName).toBeTruthy();
		expect(input.lastName === user.lastName).toBeTruthy();
		expect(input.fullName === user.fullName).toBeTruthy();
	});
	test('fullName', () => {
		const user = User.create({
			email: new Email(input.email),
			password: new Password(input.password),
			firstName: input.firstName,
		});

		expect(input.email === user.email.value).toBeTruthy();
		expect(input.password === user.password.value).toBeFalsy();
		expect(input.firstName === user.firstName).toBeTruthy();
		expect(input.firstName === user.fullName).toBeTruthy();
	});
});
