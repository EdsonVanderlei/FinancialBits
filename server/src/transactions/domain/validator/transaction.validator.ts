import { AppError } from '../../../shared/classes/app-error';
import { Validator } from '../../../shared/domain/validator';
import { Transaction } from '../entities/transaction';

export class TransactionValidator extends Validator<Transaction> {
	validate(transaction: Transaction) {
		if (isNaN(transaction.date?.getTime())) {
			throw new AppError('Invalid transaction date', 400);
		}
		if (transaction.value === 0) {
			throw new AppError('Transaction value should be different than 0', 400);
		}
		if (!transaction.description) {
			throw new AppError('Transaction description is required', 400);
		}
	}
}
