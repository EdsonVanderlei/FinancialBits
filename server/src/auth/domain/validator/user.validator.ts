import { AppError } from '../../../shared/classes/app-error';
import { Validator } from '../../../shared/domain/validator';
import { User } from '../entities/user';

export class UserValidator extends Validator<User> {
	validate(user: User) {
		if (!user.firstName) {
			throw new AppError('User first name is required', 400);
		}
	}
}
