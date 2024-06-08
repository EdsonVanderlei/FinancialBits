import { Timestamps } from '../../data-objects/timestamps/timestamps';
import { UUID } from '../../data-objects/uuid/uuid';
import { Transaction } from './transaction';

describe('Transaction', () => {
	const input = {
		id: 'c346567b-7e86-4c07-9b48-c8339b86adc2',
		date: new Date(),
		value: 100,
		description: 'test transaction',
		userId: '523b53d3-9d8d-47f9-8247-7c40c6076335',
		budgetId: 'a714be6c-9468-4b00-861e-02785949e64b',
		createdAt: new Date(),
	};

	test('create', () => {
		const transaction = Transaction.create({
			date: input.date,
			value: input.value,
			description: input.description,
			userId: new UUID(input.userId),
		});

		expect(input.date).toEqual(transaction.date);
		expect(input.value).toEqual(transaction.value);
		expect(input.description).toEqual(transaction.description);
		expect(input.userId).toEqual(transaction.userId.value);
	});
	test('load', () => {
		const transaction = Transaction.load({
			id: new UUID(input.id),
			date: input.date,
			value: input.value,
			description: input.description,
			userId: new UUID(input.userId),
			timestamps: new Timestamps(input.createdAt),
		});

		expect(input.id).toEqual(transaction.id.value);
		expect(input.date).toEqual(transaction.date);
		expect(input.value).toEqual(transaction.value);
		expect(input.description).toEqual(transaction.description);
		expect(input.userId).toEqual(transaction.userId.value);
		expect(input.createdAt).toEqual(transaction.timestamps.value.createdAt);
	});
});
