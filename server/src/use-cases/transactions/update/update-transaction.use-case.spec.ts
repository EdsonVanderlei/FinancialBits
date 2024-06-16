import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { Transaction } from '../../../domain/entities/transaction/transaction';
import { TransactionInMemoryRepository } from '../../../domain/repositories/transaction/in-memory/transaction-in-memory.repository';
import { TransactionRepository } from '../../../domain/repositories/transaction/transaction.repository';
import { TransactionValidator } from '../../../domain/validator/transaction/transaction.validator';
import { Validator } from '../../../domain/validator/validator';
import { AppError } from '../../../shared/classes/app-error';
import { UpdateTransactionUseCase } from './update-transaction.use-case';
import { UpdateTransactionUseCaseInput } from './update-transaction.use-case-io';

describe('UpdateTransactionUseCase', () => {
	let useCase: UpdateTransactionUseCase;
	let transactionRepository: TransactionRepository;
	let updateTransactionValidator: Validator<Transaction>;
	
	beforeEach(() => {
		transactionRepository = new TransactionInMemoryRepository();
		updateTransactionValidator = new TransactionValidator();
		useCase = new UpdateTransactionUseCase(transactionRepository, updateTransactionValidator);
	});

	test('Invalid transaction identifier', async () => {
		const input = {
			id: 'abc',
			date: new Date().getTime(),
			value: 100,
			description: 'Test',
			userId: UUID.generate().value,
		} as UpdateTransactionUseCaseInput;

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Invalid transaction identifier');
		});
	});
	test('Invalid user identifier', async () => {
		const input = {
			id: UUID.generate().value,
			date: new Date().getTime(),
			value: 100,
			description: 'Test',
			userId: 'abc',
		} as UpdateTransactionUseCaseInput;

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Invalid user identifier');
		});
	});
	test('Transaction not found', async () => {
		const transaction = Transaction.create({
			date: new Date(),
			value: 100,
			description: 'Test',
			userId: UUID.generate(),
		});
		const input = {
			id: transaction.id.value,
			userId: transaction.userId.value,
			date: transaction.date.getTime(),
			description: transaction.description,
			value: transaction.value,
		} as UpdateTransactionUseCaseInput;

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(404);
			expect(e.message).toEqual('Transaction not found');
		});
	});
	test('Invalid transaction date', async () => {
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
			date: 'abc',
			description: transaction.description,
			value: transaction.value,
		} as UpdateTransactionUseCaseInput;

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Invalid transaction date');
		});
	});
	test('Transaction value should be different than 0', async () => {
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
			date: transaction.date.getTime(),
			description: transaction.description,
			value: 0,
		} as UpdateTransactionUseCaseInput;

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Transaction value should be different than 0');
		});
	});
	test('Transaction description is required', async () => {
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
			date: transaction.date.getTime(),
			description: '',
			value: transaction.value,
		} as UpdateTransactionUseCaseInput;

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Transaction description is required');
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
			date: transaction.date.getTime(),
			description: transaction.description,
			value: 500,
		} as UpdateTransactionUseCaseInput;

		const result = await useCase.exec(input);

		expect(result.id).toEqual(transaction.id.value);
		expect(result.date.getTime()).toEqual(transaction.date.getTime());
		expect(result.value).not.toEqual(transaction.value);
		expect(result.description).toEqual(transaction.description);
		expect(result.userId).toEqual(transaction.userId.value);
	});
});
