import { AppError } from '../../../shared/classes/app-error';
import { UUID } from '../../../shared/domain/data-objects/uuid/uuid';
import { Transaction } from '../../domain/entities/transaction';
import { TransactionInMemoryRepository } from '../../domain/repositories/in-memory/transaction-in-memory.repository';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { DeleteTransactionUseCase } from './delete-transaction.use-case';
import { DeleteTransactionUseCaseInput } from './delete-transaction.use-case-io';

describe('DeleteTransactionUseCase', () => {
	let useCase: DeleteTransactionUseCase;
	let transactionRepository: TransactionRepository;

	beforeEach(() => {
		transactionRepository = new TransactionInMemoryRepository();
		useCase = new DeleteTransactionUseCase(transactionRepository);
	});

	test('Invalid transaction identifier', async () => {
		const input = {
			id: 'abc',
			userId: UUID.generate().value,
		} as DeleteTransactionUseCaseInput;

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Invalid transaction identifier');
		});
	});
	test('Invalid user identifier', async () => {
		const input = {
			id: UUID.generate().value,
			userId: 'abc',
		} as DeleteTransactionUseCaseInput;

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Invalid user identifier');
		});
	});
	test('Transaction not found', async () => {
		const input = {
			id: UUID.generate().value,
			userId: UUID.generate().value,
		} as DeleteTransactionUseCaseInput;

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(404);
			expect(e.message).toEqual('Transaction not found');
		});
	});
	test('Success', async () => {
		const transaction = Transaction.create({
			date: new Date(),
			value: 100,
			description: 'Test',
			userId: UUID.generate(),
		});
		await transactionRepository.create(transaction);

		const input = {
			id: transaction.id.value,
			userId: transaction.userId.value,
		} as DeleteTransactionUseCaseInput;

		await useCase.exec(input);

		expect(true).toBeTruthy();
	});
});
