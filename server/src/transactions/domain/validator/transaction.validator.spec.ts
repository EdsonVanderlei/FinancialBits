import { AppError } from '../../../shared/classes/app-error';
import { UUID } from '../../../shared/domain/data-objects/uuid/uuid';
import { Transaction } from '../entities/transaction';

import { TransactionValidator } from './transaction.validator';

describe('TransactionValidator', () => {
	const validator = new TransactionValidator();

	test('Valid', () => {
		const transaction = Transaction.create({
			userId: UUID.generate(),
			date: new Date(),
			value: 100,
			description: 'Test',
		});

		expect(() => transaction.validate(validator)).not.toThrow();
	});
	test('Invalid transaction date', () => {
		const transaction = Transaction.create({
			userId: UUID.generate(),
			date: new Date('abc'),
			value: 100,
			description: 'Test',
		});

		expect(() => transaction.validate(validator)).toThrow({
			statusCode: 400,
			message: 'Invalid transaction date',
		} as AppError);
	});
	test('Transaction value should be different than 0', () => {
		const transaction = Transaction.create({
			userId: UUID.generate(),
			date: new Date(),
			value: 0,
			description: 'Test',
		});

		expect(() => transaction.validate(validator)).toThrow({
			statusCode: 400,
			message: 'Transaction value should be different than 0',
		} as AppError);
	});
	test('Transaction description is required', () => {
		const transaction = Transaction.create({
			userId: UUID.generate(),
			date: new Date(),
			value: 100,
			description: '',
		});

		expect(() => transaction.validate(validator)).toThrow({
			statusCode: 400,
			message: 'Transaction description is required',
		} as AppError);
	});
});
