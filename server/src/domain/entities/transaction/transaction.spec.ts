import { UUID } from '../../data-objects/uuid/uuid';
import { Transaction } from './transaction';

describe('Transaction', () => {
	const input = {
		id: 'c346567b-7e86-4c07-9b48-c8339b86adc2',
		value: 100,
		date: 1714790615,
		userId: '523b53d3-9d8d-47f9-8247-7c40c6076335',
		createdAt: 0,
	};

	test('create', () => {
		const transaction = Transaction.create({
			date: input.date,
			value: input.value,
			userId: new UUID(input.userId),
		});

		expect(input.value === transaction.value).toBeTruthy();
		expect(input.userId === transaction.userId.value).toBeTruthy();
	});
	test('load', () => {
		const transaction = Transaction.load({
			id: new UUID(input.id),
			date: input.date,
			value: input.value,
			userId: new UUID(input.userId),
			createdAt: input.createdAt,
		});

		expect(input.id === transaction.id!.value).toBeTruthy();
		expect(input.value === transaction.value).toBeTruthy();
		expect(input.userId === transaction.userId.value).toBeTruthy();
		expect(input.createdAt === transaction.createdAt).toBeTruthy();
	});
});
