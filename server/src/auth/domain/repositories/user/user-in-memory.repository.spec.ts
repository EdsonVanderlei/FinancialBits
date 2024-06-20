import { UserRepositorySpecBase } from './user.repository.spec-base';
import { UserInMemoryRepository } from './user-in-memory.repository';

describe('UserInMemoryRepository', () => {
	let repository: UserInMemoryRepository;
	beforeEach(() => (repository = new UserInMemoryRepository()));

	test('create', async () => await UserRepositorySpecBase.create(repository));
	test('find by email', async () => await UserRepositorySpecBase.findByEmail(repository));
	test('find by email null', async () => await UserRepositorySpecBase.findByEmailNull(repository));
});
