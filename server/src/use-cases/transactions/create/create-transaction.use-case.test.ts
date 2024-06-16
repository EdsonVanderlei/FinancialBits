import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { Transaction } from '../../../domain/entities/transaction/transaction';
import { TransactionInMemoryRepository } from '../../../domain/repositories/transaction/in-memory/transaction-in-memory.repository';
import { TransactionRepository } from '../../../domain/repositories/transaction/transaction.repository';
import { TransactionValidator } from '../../../domain/validator/transaction/transaction.validator';
import { Validator } from '../../../domain/validator/validator';
import { AppError } from '../../../shared/classes/app-error';
import { CreateTransactionUseCase } from './create-transaction.use-case';
import { CreateTransactionUseCaseInput } from './create-transaction.use-case-io';

describe('CreateTransactionUseCase', () => {
	let useCase: CreateTransactionUseCase;
	let transactionRepository: TransactionRepository;
	let createTransactionValidator: Validator<Transaction>;
	beforeEach(() => {
		transactionRepository = new TransactionInMemoryRepository();
		createTransactionValidator = new TransactionValidator();
		useCase = new CreateTransactionUseCase(transactionRepository, createTransactionValidator);
	});

	test('Invalid user identifier', async () => {
		const input = {
			date: new Date().getTime(),
			value: 100,
			description: 'Test',
			userId: 'abc',
		} as CreateTransactionUseCaseInput;

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Invalid user identifier');
		});
	});
	test('Invalid transaction date', async () => {
		const input = {
			date: 'abc',
			value: 100,
			description: 'Test',
			userId: UUID.generate().value,
		} as CreateTransactionUseCaseInput;

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Invalid transaction date');
		});
	});
	test('Transaction value should be different than 0', async () => {
		const input = {
			date: new Date().getTime(),
			value: 0,
			description: 'Test',
			userId: UUID.generate().value,
		} as CreateTransactionUseCaseInput;

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Transaction value should be different than 0');
		});
	});
	test('Transaction description is required', async () => {
		const input = {
			date: new Date().getTime(),
			value: 100,
			description: '',
			userId: UUID.generate().value,
		} as CreateTransactionUseCaseInput;

		useCase.exec(input).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Transaction description is required');
		});
	});
	test('Success', async () => {
		const input = {
			date: new Date().getTime(),
			value: 100,
			description: 'Test',
			userId: UUID.generate().value,
		} as CreateTransactionUseCaseInput;

		const result = await useCase.exec(input);

		expect(result.date.getTime()).toEqual(new Date(input.date).getTime());
		expect(result.value).toEqual(input.value);
		expect(result.description).toEqual(input.description);
		expect(result.userId).toEqual(input.userId);
	});
});
