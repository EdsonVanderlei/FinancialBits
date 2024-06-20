import { SessionInMemoryRepository } from './session-in-memory.repository';
import { SessionRepositorySpecBase } from './session.repository.spec-base';

describe('SessionInMemoryRepository', () => {
	let repository: SessionInMemoryRepository;
	beforeEach(() => (repository = new SessionInMemoryRepository()));

	test('create', async () => SessionRepositorySpecBase.create(repository));
	test('find by user id', async () => SessionRepositorySpecBase.findByUserId(repository));
	test('find by user id null', async () => SessionRepositorySpecBase.findByUserIdNull(repository));
	test('delete by user id', async () => SessionRepositorySpecBase.deleteByUserId(repository));
});
