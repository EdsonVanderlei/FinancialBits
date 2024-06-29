import { AppError } from '../../../shared/classes/app-error';
import { UUID } from '../../../shared/domain/data-objects/uuid/uuid';
import { UseCase } from '../../../shared/use-case';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import {
	FindTransactionsByDateRangeUseCaseInput,
	FindTransactionsByDateRangeUseCaseOutput,
	FindTransactionsByDateRangeUseCaseOutputGrouped,
} from './find-transactions-by-date-range.use-case-io';

export class FindTransactionsByDateRangeUseCase
	implements UseCase<FindTransactionsByDateRangeUseCaseInput, FindTransactionsByDateRangeUseCaseOutput>
{
	constructor(private transactionRepository: TransactionRepository) {}

	async exec(input: FindTransactionsByDateRangeUseCaseInput) {
		let userId: UUID;
		try {
			userId = UUID.create(input.userId);
		} catch (e) {
			throw new AppError('Invalid user identifier', 400);
		}

		const startDate = new Date(input.startDate);
		if (isNaN(startDate.getTime())) {
			throw new AppError('Invalid start date', 400);
		}

		const endDate = new Date(input.endDate);
		if (isNaN(endDate.getTime())) {
			throw new AppError('Invalid end date', 400);
		}

		const transactions = await this.transactionRepository.findByDateRange(startDate, endDate, userId);
		const result = transactions.map(transaction => ({
			id: transaction.id.value,
			date: transaction.date,
			value: transaction.value,
			description: transaction.description,
			userId: transaction.userId.value,
			...transaction.timestamps.value,
		}));

		if (!input.groupBy || input.groupBy !== 'date') return result;

		return result.reduce((acc, curr) => {
			const dateStr = curr.date.toISOString().split('T')[0];
			if (!acc[dateStr]) acc[dateStr] = [];
			acc[dateStr].push(curr);
			return acc;
		}, {} as FindTransactionsByDateRangeUseCaseOutputGrouped);
	}
}
