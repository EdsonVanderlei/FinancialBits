import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { Transaction } from '../../../domain/entities/transaction/transaction';
import { TransactionInMemoryRepository } from '../../../domain/repositories/in-memory/transaction/transaction-in-memory.repository';
import { AppError } from '../../../shared/classes/app-error';
import { UpdateTransactionUseCase } from './update-transaction.use-case';

describe('UpdateTransactionUseCase', () => {
	const transactionRepository = new TransactionInMemoryRepository();
	const updateTransactionUseCase = new UpdateTransactionUseCase(transactionRepository);

	test('exec', async () => {
		const transaction = await transactionRepository.create(
			Transaction.create({
				value: 100,
				date: new Date().getTime(),
				description: 'description',
				userId: new UUID(),
			})
		);

		const result = await updateTransactionUseCase.exec({
			id: transaction.id!.value,
			value: 50,
			date: transaction.date,
			description: transaction.description,
		});

		expect(result.id).toEqual(transaction.id.value);
		expect(result.value).toEqual(50);
		expect(result.date).toEqual(transaction.date);
		expect(result.description).toEqual(transaction.description);
		expect(result.userId).toEqual(transaction.userId.value);
		expect(result.createdAt).toEqual(transaction.createdAt);
		expect(result.updatedAt).not.toEqual(transaction.updatedAt);
	});
	test('transaction not found', async () => {
		const transaction = Transaction.create({
			value: 100,
			date: new Date().getTime(),
			description: 'description',
			userId: new UUID(),
		});

		updateTransactionUseCase
			.exec({
				id: transaction.id!.value,
				value: 50,
				date: transaction.date,
				description: transaction.description,
			})
			.catch(e => {
				expect(e).toBeInstanceOf(AppError);
				expect(e.statusCode).toBe(404);
				expect(e.message).toBe("Transaction doesn't exist");
			});
	});
});
