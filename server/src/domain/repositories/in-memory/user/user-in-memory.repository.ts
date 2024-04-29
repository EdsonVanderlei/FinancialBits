import { User } from '../../../entities/user/user';

import { InMemoryRepository } from '../in-memory.repository';

export class UserInMemoryRepository extends InMemoryRepository<User> {
	async create(value: Omit<User, 'id'>) {
		const user = User.create(
			value.email.value,
			value.password.value,
			value.firstName,
			value.lastName
		);
		this._values.push(user);
		return user;
	}

	async update(value: User) {
		const user = await this.findOne({ id: value.id });
		if (!user) return null;

		this._values.splice(this._values.indexOf(user), 1);
		const newUser = User.restore(
			value.id!,
			value.email,
			value.password,
			value.firstName,
			value.lastName
		);
		this._values.push(newUser);

		return newUser;
	}
}
