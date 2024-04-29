import { Email } from '../../data-objects/email/email';
import { Password } from '../../data-objects/password/password';
import { UUID } from '../../data-objects/uuid/uuid';
import { User } from './user';

describe('User', () => {
	test('create', () => {
		const input = {
			email: 'email@test.com',
			password: '12345',
			firstName: 'John',
			lastName: 'Doe',
			fullName: 'John Doe',
		};

		const user = User.create(
			input.email,
			input.password,
			input.firstName,
			input.lastName
		);

		expect(input.email === user.email.value).toBeTruthy();
		expect(input.password === user.password.value).toBeFalsy();
		expect(input.firstName === user.firstName).toBeTruthy();
		expect(input.lastName === user.lastName).toBeTruthy();
		expect(input.fullName === user.fullName).toBeTruthy();
	});
	test('restore', () => {
		const input = {
			id: '2b558e4f-d281-4b54-9710-50c52c647e5d',
			email: 'email@test.com',
			password: '123',
			firstName: 'John',
			lastName: 'Doe',
			fullName: 'John Doe',
		};

		const user = User.restore(
			new UUID(input.id, false),
			new Email(input.email, false),
			new Password(input.password, false, false),
			input.firstName,
			input.lastName
		);

		expect(input.id === user.id?.value).toBeTruthy();
		expect(input.email === user.email.value).toBeTruthy();
		expect(input.password === user.password.value).toBeTruthy();
		expect(input.firstName === user.firstName).toBeTruthy();
		expect(input.lastName === user.lastName).toBeTruthy();
		expect(input.fullName === user.fullName).toBeTruthy();
	});
	test('fullName', () => {
		const input = {
			email: 'email@test.com',
			password: '12345',
			firstName: 'John',
		};

		const user = User.create(input.email, input.password, input.firstName);

		expect(input.email === user.email.value).toBeTruthy();
		expect(input.password === user.password.value).toBeFalsy();
		expect(input.firstName === user.firstName).toBeTruthy();
		expect(input.firstName === user.fullName).toBeTruthy();
	});
});
