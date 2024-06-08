import { AppError } from '../../../shared/classes/app-error';
import { Transaction } from '../../entities/transaction/transaction';
import { Validator } from '../validator';

export class CreateTransactionValidator extends Validator<Transaction> {
	validate(transaction: Transaction) {
		if (transaction.value === 0) {
			throw new AppError('Transaction value should be different than 0', 400);
		}
		if (!transaction.description) {
			throw new AppError('Transaction description is required', 400);
		}
		this.tryDataObject(transaction.userId, 'Invalid user identifier');
	}
}
