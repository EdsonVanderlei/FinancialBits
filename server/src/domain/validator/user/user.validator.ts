import { AppError } from '../../../shared/classes/app-error';
import { User } from '../../entities/user/user';
import { Validator } from '../validator';

export class UserValidator extends Validator<User> {
	validate(user: User) {
		if (!user.firstName) {
			throw new AppError('User first name is required', 400);
		}
	}
}
