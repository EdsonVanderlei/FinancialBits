import { Timestamps } from '../../../shared/domain/data-objects/timestamps/timestamps';
import { UUID } from '../../../shared/domain/data-objects/uuid/uuid';
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

	test('Create', () => {
		const transaction = Transaction.create({
			date: input.date,
			value: input.value,
			description: input.description,
			userId: UUID.create(input.userId),
		});

		expect(transaction.id).toBeDefined();
		expect(transaction.userId.value).toEqual(input.userId);
		expect(transaction.date).toEqual(input.date);
		expect(transaction.value).toEqual(input.value);
		expect(transaction.description).toEqual(input.description);
		expect(transaction.timestamps).toBeDefined();
	});
	test('Load', () => {
		const transaction = Transaction.load({
			id: UUID.create(input.id),
			date: input.date,
			value: input.value,
			description: input.description,
			userId: UUID.create(input.userId),
			timestamps: Timestamps.create({ createdAt: input.createdAt }),
		});

		expect(transaction.id.value).toEqual(input.id);
		expect(transaction.userId.value).toEqual(input.userId);
		expect(transaction.date).toEqual(input.date);
		expect(transaction.value).toEqual(input.value);
		expect(transaction.description).toEqual(input.description);
		expect(transaction.timestamps.value.createdAt.getTime()).toEqual(input.createdAt.getTime());
	});
});
