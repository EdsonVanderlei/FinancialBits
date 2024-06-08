import { AppError } from '../../../shared/classes/app-error';
import { Email } from '../../data-objects/email/email';
import { Password } from '../../data-objects/password/password';
import { User } from '../../entities/user/user';
import { CreateUserValidator } from './create-user.validator';

describe('CreateUserValidator', () => {
	let validator: CreateUserValidator;
	beforeEach(() => (validator = new CreateUserValidator()));

	test('valid', () => {
		const user = User.create({
			email: new Email('user@test.com'),
			password: new Password('abc123'),
			firstName: 'John',
			lastName: 'Doe',
		});

		user.validate(validator);

		expect(true).toBeTruthy();
	});
	test('invalid first name', () => {
		const user = User.create({
			email: new Email('user@test.com'),
			password: new Password('abc123'),
			firstName: '',
			lastName: 'Doe',
		});

		expect(() => user.validate(validator)).toThrow({
			statusCode: 400,
			message: 'First name is required',
		} as AppError);
	});
});
