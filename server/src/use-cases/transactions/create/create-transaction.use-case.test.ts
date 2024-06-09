import { Email } from '../../../domain/data-objects/email/email';
import { Password } from '../../../domain/data-objects/password/password';
import { Timestamps } from '../../../domain/data-objects/timestamps/timestamps';
import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { User } from '../../../domain/entities/user/user';
import { TransactionInMemoryRepository } from '../../../domain/repositories/transaction/in-memory/transaction-in-memory.repository';
import { UserInMemoryRepository } from '../../../domain/repositories/user/in-memory/user-in-memory.repository';
import { TransactionValidator } from '../../../domain/validator/transaction/transaction.validator';
import { AppError } from '../../../shared/classes/app-error';
import { CreateTransactionUseCase } from './create-transaction.use-case';

describe('CreateTransactionUseCase', () => {
	const userRepository = new UserInMemoryRepository();
	const transactionRepository = new TransactionInMemoryRepository();
	const createTransactionValidator = new TransactionValidator();
	const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository, createTransactionValidator);
	const user = User.load({
		id: UUID.create('23325fb9-8acc-4b91-966b-f5f37cce18d8'),
		email: Email.create('user@test.com'),
		password: Password.create('abc123'),
		firstName: 'John',
		timestamps: Timestamps.generate(),
	});

	test('exec', async () => {
		const savedUser = await userRepository.create(user);
		const transaction = await createTransactionUseCase.exec({
			date: 1714790615,
			value: 100,
			description: 'description',
			userId: savedUser.id!.value,
		});

		expect(transaction).toBeDefined();
	});
	test('invalid value', () => {
		createTransactionUseCase
			.exec({
				date: 1714790615,
				value: 0,
				description: 'description',
				userId: user.id!.value,
			})
			.catch(e => {
				expect(e).toBeInstanceOf(AppError);
				expect(e.statusCode).toBe(400);
				expect(e.message).toBe('Transaction value must be different from 0');
			});
	});
	test('invalid date', () => {
		createTransactionUseCase
			.exec({
				date: 0,
				value: 100,
				description: 'description',
				userId: user.id!.value,
			})
			.catch(e => {
				expect(e).toBeInstanceOf(AppError);
				expect(e.statusCode).toBe(400);
				expect(e.message).toBe('Transaction date is invalid');
			});
	});
	test('user not found', () => {
		createTransactionUseCase
			.exec({
				date: 1714790615,
				value: 100,
				description: 'description',
				userId: user.id!.value,
			})
			.catch(e => {
				expect(e).toBeInstanceOf(AppError);
				expect(e.statusCode).toBe(404);
				expect(e.message).toBe("The user doesn't exist");
			});
	});
});
