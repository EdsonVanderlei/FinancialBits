import { UUID } from '../../../shared/domain/data-objects/uuid/uuid';
import { Email } from '../data-objects/email/email';
import { User } from '../entities/user';

export interface UserRepository {
	create(user: User): Promise<User | null>;
	findById(id: UUID): Promise<User | null>;
	findByEmail(email: Email): Promise<User | null>;
}
