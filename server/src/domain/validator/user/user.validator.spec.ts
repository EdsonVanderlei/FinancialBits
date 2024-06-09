import { AppError } from '../../../shared/classes/app-error';
import { Email } from '../../data-objects/email/email';
import { Password } from '../../data-objects/password/password';
import { User } from '../../entities/user/user';
import { UserValidator } from './user.validator';

describe('UserValidator', () => {
	const validator = new UserValidator();

	test('Valid', () => {
		const user = User.create({
			firstName: 'John',
			email: Email.create('test@test.com'),
			password: Password.create('abc124'),
		});

		expect(() => user.validate(validator)).not.toThrow();
	});
	test('User first name is required', () => {
		const user = User.create({
			firstName: '',
			email: Email.create('test@test.com'),
			password: Password.create('abc124'),
		});

		expect(() => user.validate(validator)).toThrow({
			statusCode: 400,
			message: 'User first name is required',
		} as AppError);
	});
});
