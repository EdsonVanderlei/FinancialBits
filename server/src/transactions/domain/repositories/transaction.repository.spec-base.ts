import { UUID } from '../../../shared/domain/data-objects/uuid/uuid';
import { Transaction } from '../entities/transaction';
import { TransactionRepository } from './transaction.repository';

export const TransactionRepositorySpacBase = {
	create: async (repository: TransactionRepository) => {
		const userId = UUID.generate();
		const transaction = Transaction.create({
			userId,
			date: new Date(1717963787000),
			description: 'Test',
			value: 100,
		});
		const result = await repository.create(transaction);

		expect(result).toMatchObject(transaction);
	},
	update: async (repository: TransactionRepository) => {
		const userId = UUID.generate();
		const transaction = Transaction.create({
			userId,
			date: new Date(1717963787000),
			description: 'Test',
			value: 100,
		});
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
	},
	findById: async (repository: TransactionRepository) => {
		const userId = UUID.generate();
		const transaction = Transaction.create({
			userId,
			date: new Date(1717963787000),
			description: 'Test',
			value: 100,
		});
		await repository.create(transaction);
		const result = await repository.findById(transaction.id, transaction.userId);

		expect(result).toMatchObject(transaction);
	},
	findByIdNull: async (repository: TransactionRepository) => {
		const userId = UUID.generate();
		const transaction = Transaction.create({
			userId,
			date: new Date(1717963787000),
			description: 'Test',
			value: 100,
		});
		const result = await repository.findById(transaction.id, transaction.userId);

		expect(result).toEqual(null);
	},
	findByDateRange: async (repository: TransactionRepository) => {
		const userId = UUID.generate();
		const transaction = Transaction.create({
			userId,
			date: new Date(1717963787000),
			description: 'Test',
			value: 100,
		});
		await repository.create(transaction);
		const transaction1 = Transaction.create({
			userId,
			date: new Date(1717531787000),
			description: transaction.description,
			value: 100,
		});
		const transaction2 = Transaction.create({
			userId,
			date: new Date(1712261387000),
			description: transaction.description,
			value: 100,
		});
		await repository.create(transaction1);
		await repository.create(transaction2);

		const result = await repository.findByDateRange(new Date(1717200000000), new Date(1719878399000), transaction.userId);
		const resultIds = result.map(record => record.id.value);

		expect(resultIds).toContain(transaction.id.value);
		expect(resultIds).toContain(transaction1.id.value);
		expect(resultIds).not.toContain(transaction2.id.value);
	},
	deleteById: async (repository: TransactionRepository) => {
		const userId = UUID.generate();
		const transaction = Transaction.create({
			userId,
			date: new Date(1717963787000),
			description: 'Test',
			value: 100,
		});
		await repository.create(transaction);
		await repository.deleteById(transaction.id, transaction.userId);
		const result = await repository.findById(transaction.id, transaction.userId);

		expect(result).toEqual(null);
	},
};
