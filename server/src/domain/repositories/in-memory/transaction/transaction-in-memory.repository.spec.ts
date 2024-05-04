import { UUID } from "../../../data-objects/uuid/uuid";
import { Transaction } from "../../../entities/transaction/transaction";
import { LoadTransactionProps } from "../../../types/transaction/load-transaction-props";
import { TransactionInMemoryRepository } from "./transaction-in-memory.repository";

const getTransaction = (replace?: Partial<LoadTransactionProps>) =>
	({
		id: 'cdddcff3-270a-40cd-8888-9a18b80e8e6e',
		value: 100,
		userId: '0c72141c-7c6c-4450-bedd-d5afca3aff61',
		createdAt: 0,
		...replace,
	} as LoadTransactionProps);

describe('TransactionInMemoryRepository', () => {
	let repository: TransactionInMemoryRepository;

	beforeEach(() => {
		repository = new TransactionInMemoryRepository();
	});

	test('findAll', async () => {
		const transaction = await repository.create(getTransaction());

		expect(await repository.findAll()).toContainEqual(transaction);
	});

	test('findById', async () => {
		const transaction = await repository.create(getTransaction());

		expect(await repository.findOne({ id: transaction.id })).toEqual(transaction);
		expect(await repository.findOne({ id: new UUID('', false) })).toBeFalsy();
	});

	test('create', async () => {
		const transaction = await repository.create(getTransaction());

		expect(transaction).toBeInstanceOf(Transaction);
	});

	test('update', async () => {
		const transaction = await repository.create(getTransaction());

		const newTransaction = await repository.update(
			getTransaction({ value: 50, id: transaction.id })
		);

		expect(newTransaction?.value).toEqual(50);
		expect(newTransaction?.id?.value === transaction.id?.value).toBe(true);
		expect(await repository.findAll()).not.toContainEqual(transaction);
	});

	test('delete', async () => {
		const user = await repository.create(getTransaction());
		const { deleteCount } = await repository.delete({ id: user.id });

		expect(deleteCount).toEqual(1);
		expect(await repository.findAll()).not.toContainEqual(user);
	});
});
