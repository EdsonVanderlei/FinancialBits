import { AppError } from '../../../shared/classes/app-error';
import { Validator } from '../validator';
import { User } from './../../entities/user/user';

export class CreateUserValidator extends Validator<User> {
	validate(user: User) {
		if (!user.firstName) {
			throw new AppError('First name is required', 400);
		}
		user.email.validate();
		user.password.validate();
	}
}
