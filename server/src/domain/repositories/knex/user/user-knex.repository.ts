import { Email } from '../../../data-objects/email/email';
import { Password } from '../../../data-objects/password/password';
import { User } from '../../../entities/user/user';
import { KnexRespository } from '../knex.repository';
import { UUID } from './../../../data-objects/uuid/uuid';

export class UserKnexRespository extends KnexRespository<User> {
	protected databaseToEntity(user: any) {
		return User.load({
			id: new UUID(user.id),
			email: new Email(user.email),
			password: new Password(user.password, false, false),
			firstName: user.first_name,
			lastName: user.last_name,
			createdAt: user.created_at,
			updatedAt: user.updated_at,
		});
	}

	protected entityToDatabase(user: User) {
		return {
			id: user.id.value,
			email: user.email.value,
			password: user.password.value,
			first_name: user.firstName,
			last_name: user.lastName ?? null,
		};
	}
}
