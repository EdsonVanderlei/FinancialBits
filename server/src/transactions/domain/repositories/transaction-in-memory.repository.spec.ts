import { TransactionInMemoryRepository } from './transaction-in-memory.repository';
import { TransactionRepositorySpacBase } from './transaction.repository.spec-base';

describe('TransactionInMemoryRepository', () => {
	let repository: TransactionInMemoryRepository;
	beforeEach(() => (repository = new TransactionInMemoryRepository()));

	test('create', async () => TransactionRepositorySpacBase.create(repository));
	test('update', async () => TransactionRepositorySpacBase.update(repository));
	test('find by id', async () => TransactionRepositorySpacBase.findById(repository));
	test('find by id null', async () => TransactionRepositorySpacBase.findByIdNull(repository));
	test('find by date range', async () => TransactionRepositorySpacBase.findByDateRange(repository));
	test('delete by id', async () => TransactionRepositorySpacBase.deleteById(repository));
});
