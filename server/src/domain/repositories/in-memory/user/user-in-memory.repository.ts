import { User } from '../../../entities/user/user';
import { InMemoryRepository } from '../in-memory.repository';

export class UserInMemoryRepository extends InMemoryRepository<User> {}
