import { Email } from '../../data-objects/email/email';
import { User } from '../../entities/user/user';

export interface UserRepository {
	create(user: User): Promise<User>;
	findByEmail(email: Email): Promise<User | null>;
}
