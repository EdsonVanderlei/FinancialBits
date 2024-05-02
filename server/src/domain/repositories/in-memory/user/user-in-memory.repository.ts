import { User } from '../../../entities/user/user';
import { CreateUserProps } from '../../../types/user/create-user-props';
import { LoadUserProps } from '../../../types/user/load-user-props';
import { UserRepository } from '../../user-repository';

export class UserInMemoryRepository implements UserRepository {
	protected _users: User[] = [];

	private filterWhere = (where: Partial<LoadUserProps>) => (user: User) => {
		return Object.entries(where).every(entry => {
			const userProp = user[entry[0] as keyof User];
			if (typeof userProp === 'object') {
				return userProp.value === (entry[1] as any).value;
			}
			return userProp === entry[1];
		});
	};

	async exists(where: Partial<LoadUserProps>) {
		return !!(await this.findOne(where));
	}

	async findAll(where?: Partial<LoadUserProps>) {
		return this._users.filter(where ? this.filterWhere(where) : () => true);
	}

	async findOne(where: Partial<LoadUserProps>) {
		const result = await this.findAll(where);

		if (!result || result.length < 1) {
			return null;
		}
		return result[0];
	}

	async create(props: CreateUserProps) {
		const user = User.create(props);
		this._users.push(user);
		return user;
	}

	async update(props: LoadUserProps) {
		const user = await this.findOne({ id: props.id });
		if (!user) return null;

		this._users.splice(this._users.indexOf(user), 1);
		const newUser = User.load(props);
		this._users.push(newUser);

		return newUser;
	}

	async delete(where: Partial<LoadUserProps>) {
		const users = await this.findAll(where);
		let deleteCount = 0;
		users.forEach((_, index) => {
			this._users.splice(index, 1);
			deleteCount++;
		});
		return { deleteCount };
	}
}
