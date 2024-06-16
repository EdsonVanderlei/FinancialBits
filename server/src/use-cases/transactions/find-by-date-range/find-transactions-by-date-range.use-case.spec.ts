import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { Transaction } from '../../../domain/entities/transaction/transaction';
import { TransactionInMemoryRepository } from '../../../domain/repositories/transaction/in-memory/transaction-in-memory.repository';
import { TransactionRepository } from '../../../domain/repositories/transaction/transaction.repository';
import { AppError } from '../../../shared/classes/app-error';
import { FindTransactionsByDateRangeUseCase } from './find-transactions-by-date-range.use-case';
import { FindTransactionsByDateRangeUseCaseInput } from './find-transactions-by-date-range.use-case-io';

describe('FindTransactionsByDateRangeUseCase', () => {
	let useCase: FindTransactionsByDateRangeUseCase;
	let transactionRepository: TransactionRepository;
	let startDate: number;
	let endDate: number;

	beforeEach(() => {
		transactionRepository = new TransactionInMemoryRepository();
		useCase = new FindTransactionsByDateRangeUseCase(transactionRepository);
		const sDate = new Date();
		const eDate = new Date(sDate.getUTCFullYear(), sDate.getUTCMonth() + 1, sDate.getDate());
		startDate = sDate.getTime();
		endDate = eDate.getTime();
	});

	test('Invalid user identifier', async () => {
		const input = {
			userId: 'abc',
			startDate,
			endDate,
		} as FindTransactionsByDateRangeUseCaseInput;

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Invalid user identifier');
		});
	});
	test('Invalid start date', async () => {
		const input = {
			userId: UUID.generate().value,
			startDate: 'abc',
			endDate,
		} as FindTransactionsByDateRangeUseCaseInput;

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Invalid start date');
		});
	});
	test('Invalid end date', async () => {
		const input = {
			userId: UUID.generate().value,
			startDate,
			endDate: 'abc',
		} as FindTransactionsByDateRangeUseCaseInput;

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Invalid end date');
		});
	});
	test('Success', async () => {
		const transaction = Transaction.create({
			userId: UUID.generate(),
			date: new Date(),
			description: 'Test',
			value: 100,
		});
		await transactionRepository.create(transaction);
		const input = {
			userId: transaction.userId.value,
			startDate,
			endDate,
		} as FindTransactionsByDateRangeUseCaseInput;

		const result = await useCase.exec(input);

		expect(result.length).toEqual(1);
		expect(result[0].id).toEqual(transaction.id.value);
	});
	test('Success exclude', async () => {
		const now = new Date();
		const transaction = Transaction.create({
			userId: UUID.generate(),
			date: now,
			description: 'Test',
			value: 100,
		});
		const transaction2 = Transaction.create({
			userId: UUID.generate(),
			date: new Date(now.getUTCFullYear(), now.getUTCMonth() - 1, now.getUTCDate()),
			description: 'Test',
			value: 100,
		});
		const transaction3 = Transaction.create({
			userId: UUID.generate(),
			date: new Date(now.getUTCFullYear(), now.getUTCMonth() + 2, now.getUTCDate()),
			description: 'Test',
			value: 100,
		});
		await transactionRepository.create(transaction);
		await transactionRepository.create(transaction2);
		await transactionRepository.create(transaction3);
		const input = {
			userId: transaction.userId.value,
			startDate,
			endDate,
		} as FindTransactionsByDateRangeUseCaseInput;

		const result = await useCase.exec(input);

		expect(result.length).toEqual(1);
		expect(result[0].id).toEqual(transaction.id.value);
	});
});
