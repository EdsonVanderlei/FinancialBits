import { UUID } from '../../../data-objects/uuid/uuid';
import { Transaction } from '../../../entities/transaction/transaction';
import { TransactionInMemoryRepository } from './transaction-in-memory.repository';

describe('TransactionInMemoryRepository', () => {
	let repository: TransactionInMemoryRepository;
	const userId = UUID.generate();
	const transaction = Transaction.create({
		userId,
		date: new Date(1717963787000),
		description: 'Test',
		value: 100,
	});
	beforeEach(() => (repository = new TransactionInMemoryRepository()));

	test('create', async () => {
		const result = await repository.create(transaction);

		expect(result).toMatchObject(transaction);
	});
	test('update', async () => {
		await repository.create(transaction);
		const newTransaction = Transaction.load({
			id: transaction.id,
			userId: transaction.userId,
			date: transaction.date,
			description: transaction.description,
			value: 50,
			timestamps: transaction.timestamps,
		});
		const result = await repository.update(newTransaction);

		expect(result?.id.value).toEqual(transaction.id.value);
		expect(result?.value).not.toEqual(transaction.value);
	});
	test('find by id', async () => {
		await repository.create(transaction);
		const result = await repository.findById(transaction.id, transaction.userId);

		expect(result).toMatchObject(transaction);
	});
	test('find by id null', async () => {
		const result = await repository.findById(transaction.id, transaction.userId);

		expect(result).toEqual(null);
	});
	test('find by date range', async () => {
		await repository.create(transaction);
		const transaction1 = Transaction.load({
			id: transaction.id,
			userId: transaction.userId,
			date: new Date(1717531787000),
			description: transaction.description,
			value: 100,
			timestamps: transaction.timestamps,
		});
		const transaction2 = Transaction.load({
			id: transaction.id,
			userId: transaction.userId,
			date: new Date(1712261387000),
			description: transaction.description,
			value: 100,
			timestamps: transaction.timestamps,
		});
		await repository.create(transaction1);
		await repository.create(transaction2);

		const result = await repository.findByDateRange(
			new Date(1717200000000),
			new Date(1719878399000),
			transaction.userId
		);

		expect(result).toContain(transaction);
		expect(result).toContain(transaction1);
		expect(result).not.toContain(transaction2);
	});
	test('delete by id', async () => {
		await repository.create(transaction);
		await repository.deleteById(transaction.id, transaction.userId);
		const result = await repository.findById(transaction.id, transaction.userId);

		expect(result).toEqual(null);
	});
});
