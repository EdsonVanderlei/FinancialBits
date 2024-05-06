import knex from 'knex';
import * as knexFileConfig from '../../../../../knexfile';
import { UUID } from '../../../data-objects/uuid/uuid';
import { Transaction } from '../../../entities/transaction/transaction';
import { TransactionKnexRespository } from './transaction-knex.repository';

describe('TransactionKnexRespository', () => {
	const knexConfig = knexFileConfig as any;
	let knexInstance: knex.Knex<any, unknown[]>;
	let transactionRespository: TransactionKnexRespository;
	const transaction = Transaction.create({
		value: 100,
		date: 1714948181,
		description: 'description',
		userId: new UUID(),
	});

	beforeAll(() => {
		knexInstance = knex(knexConfig.development_test);
		transactionRespository = new TransactionKnexRespository(knexInstance, 'transactions');
	});
	beforeEach(async () => await knexInstance.table('transactions').del());
	afterAll(async () => await knexInstance.destroy());

	test('findAll', async () => {
		await transactionRespository.create(transaction);
		const result = await transactionRespository.findAll();

		expect(result.length).toEqual(1);
	});

	test('findOne', async () => {
		await transactionRespository.create(transaction);
		const result = await transactionRespository.findOne({ userId: transaction.userId });

		expect(result?.id.value).toEqual(transaction.id.value);
	});

	test('exists', async () => {
		await transactionRespository.create(transaction);
		const result = await transactionRespository.exists({ userId: transaction.userId });

		expect(result).toBeTruthy();
	});

	test('exists false', async () => {
		const result = await transactionRespository.exists({ userId: transaction.userId });

		expect(result).toBeFalsy();
	});

	test('create', async () => {
		const result = await transactionRespository.create(transaction);
		console.log(result);
		expect(result).toBeDefined();
	});

	test('update', async () => {
		await transactionRespository.create(transaction);
		const value = 50;
		const result = await transactionRespository.update(transaction.id!, Transaction.load({ ...transaction, id: transaction.id!, value }));

		expect(result).toBeDefined();
		expect(result?.value).toEqual(value);
		expect(result?.id.value).toEqual(transaction.id.value);
	});

	test('delete', async () => {
		await transactionRespository.create(transaction);
		const result = await transactionRespository.delete({ id: transaction.id });

		expect(result.deleteCount).toEqual(1);
	});

	test('delete false', async () => {
		const result = await transactionRespository.delete({ id: transaction.id });

		expect(result.deleteCount).toEqual(0);
	});
});
