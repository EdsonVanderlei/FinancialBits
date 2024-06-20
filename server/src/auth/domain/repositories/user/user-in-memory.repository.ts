import { Email } from '../../data-objects/email/email';
import { User } from '../../entities/user/user';
import { UserRepository } from './user.repository';

export class UserInMemoryRepository implements UserRepository {
	private users: User[] = [];

	async create(user: User) {
		this.users.push(user);
		return user;
	}

	async findByEmail(email: Email) {
		return this.users.find(user => user.email.value === email.value) ?? null;
	}
}
