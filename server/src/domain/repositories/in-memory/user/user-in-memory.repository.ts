import { User } from '../../../entities/user/user';
import { LoadUserProps } from '../../../types/user/load-user-props';
import { InMemoryRepository } from '../in-memory.repository';

export class UserInMemoryRepository extends InMemoryRepository<User> {
	protected _filterWhere = (where: Partial<LoadUserProps>) => (user: User) => {
		return Object.entries(where).every(entry => {
			const userProp = user[entry[0] as keyof User];
			if (typeof userProp === 'object') {
				return userProp.value === (entry[1] as any).value;
			}
			return userProp === entry[1];
		});
	};
}
