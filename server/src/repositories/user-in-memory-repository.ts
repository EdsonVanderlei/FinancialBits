import { InMemoryRepository } from '../core/in-memory-repository';
import { User } from '../entities/user';
import { UuidUtils } from '../utils/uuid/uuid.utils';

export class UserInMemoryRepository extends InMemoryRepository<User> {
	async create(value: Omit<User, 'id'>) {
		const user = new User(
			UuidUtils.generate(),
			value.email,
			value.password,
			value.firstName,
			value.lastName
		);
		this._values.push(user);

		return user;
	}

	async update(value: User) {
		const user = await this.findOne({ id: value.id });
		if (!user) {
			return null;
		}

		this._values.splice(this._values.indexOf(user), 1);

		const newUser = new User(
			value.id,
			value.email,
			value.password,
			value.firstName,
			value.lastName
		);
		this._values.push(newUser);

		return newUser;
	}

	async delete(where: Partial<User>) {
		const user = await this.findOne(where);
		if (!user) {
			return null;
		}

		this._values.splice(this._values.indexOf(user), 1);
		return user;
	}
}
