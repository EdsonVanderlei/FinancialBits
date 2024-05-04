import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { TransactionInMemoryRepository } from '../../../domain/repositories/in-memory/transaction/transaction-in-memory.repository';
import { Transaction } from './../../../domain/entities/transaction/transaction';
import { LoadTransactionsUseCase } from './load-transactions.use-case';

describe('LoadTransactionsUseCase', () => {
	let userId = new UUID('458f142b-4677-463a-a98f-56c24d981495');
	let loadTransactionsUseCase: LoadTransactionsUseCase;

	beforeAll(async () => {
		const transactionRepository = new TransactionInMemoryRepository();
		loadTransactionsUseCase = new LoadTransactionsUseCase(transactionRepository);

		await transactionRepository.create(
			Transaction.create({
				date: 0,
				value: 100,
				description: 'description',
				userId: userId,
			})
		);
		await transactionRepository.create(
			Transaction.create({
				date: 10,
				value: -50,
				description: 'description',
				userId: new UUID('6cdeebc8-0ef8-4b93-95dc-f52b28824fbb'),
			})
		);
	});

	test('exec', async () => {
		const transactions = await loadTransactionsUseCase.exec({});

		expect(transactions).toBeDefined();
		expect(transactions.length).toEqual(2);
	});
	test('user not found', async () => {
		const transactions = await loadTransactionsUseCase.exec({ userId: 'bea0a08e-996f-4441-b303-9604a1e368fb' });

		expect(transactions).toBeDefined();
		expect(transactions.length).toEqual(0);
	});
	test('filter userId', async () => {
		const transactions = await loadTransactionsUseCase.exec({ userId: userId.value });

		expect(transactions).toBeDefined();
		expect(transactions.length).toEqual(1);
		expect(transactions.every(t => t.userId.value === userId.value)).toBeTruthy();
	});
});
