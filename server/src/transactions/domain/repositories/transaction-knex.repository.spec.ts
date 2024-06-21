import knex from 'knex';
import config from '../../../../knexfile';
import { TransactionKnexRepository } from './transaction-knex.repository';
import { TransactionRepositorySpacBase } from './transaction.repository.spec-base';

describe('TransactionKnexRepository', () => {
	let repository: TransactionKnexRepository;
	const knexInstance = knex(config.test);

	beforeEach(async () => {
		repository = new TransactionKnexRepository(knexInstance);
		await knexInstance.table('transactions').del();
	});
	afterAll(async () => await knexInstance.destroy());

	test('create', async () => TransactionRepositorySpacBase.create(repository));
	test('update', async () => TransactionRepositorySpacBase.update(repository));
	test('find by id', async () => TransactionRepositorySpacBase.findById(repository));
	test('find by id null', async () => TransactionRepositorySpacBase.findByIdNull(repository));
	test('find by date range', async () => TransactionRepositorySpacBase.findByDateRange(repository));
	test('delete by id', async () => TransactionRepositorySpacBase.deleteById(repository));
});
