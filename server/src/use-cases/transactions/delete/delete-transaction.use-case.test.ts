import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { Transaction } from '../../../domain/entities/transaction/transaction';
import { TransactionInMemoryRepository } from '../../../domain/repositories/transaction/transaction-in-memory.repository';
import { AppError } from '../../../shared/classes/app-error';
import { DeleteTransactionUseCase } from './delete-transaction.use-case';

describe('DeleteTransactionUseCase', () => {
	const transactionRepository = new TransactionInMemoryRepository();
	const deleteTransactionUseCase = new DeleteTransactionUseCase(transactionRepository);

	test('exec', async () => {
		const transaction = await transactionRepository.create(
			Transaction.create({
				value: 100,
				date: new Date().getTime(),
				description: 'description',
				userId: new UUID(),
			})
		);

		const result = await deleteTransactionUseCase.exec({
			id: transaction.id!.value,
		});

		expect(result.deleteCount).toEqual(1);
	});
	test('transaction not found', async () => {
		const transaction = Transaction.create({
			value: 100,
			date: new Date().getTime(),
			description: 'description',
			userId: new UUID(),
		});

		deleteTransactionUseCase
			.exec({
				id: transaction.id!.value,
			})
			.catch(e => {
				expect(e).toBeInstanceOf(AppError);
				expect(e.statusCode).toBe(404);
				expect(e.message).toBe("Transaction doesn't exist");
			});
	});
});
