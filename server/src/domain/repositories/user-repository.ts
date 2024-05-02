import { User } from '../entities/user/user';
import { CreateUserProps } from '../types/user/create-user-props';
import { LoadUserProps } from '../types/user/load-user-props';
import { Repository } from './repository';

export interface UserRepository extends Repository<User> {
	exists(where: Partial<LoadUserProps>): Promise<boolean>;
	findAll(where?: Partial<LoadUserProps>): Promise<User[]>;
	findOne(where: Partial<LoadUserProps>): Promise<User | null>;
	create(props: CreateUserProps): Promise<User>;
	update(props: LoadUserProps): Promise<User | null>;
	delete(where: Partial<LoadUserProps>): Promise<{ deleteCount: number }>;
}
