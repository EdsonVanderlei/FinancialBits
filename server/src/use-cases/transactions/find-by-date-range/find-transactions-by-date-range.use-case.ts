import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { TransactionRepository } from '../../../domain/repositories/transaction/transaction.repository';
import { AppError } from '../../../shared/classes/app-error';
import { UseCase } from '../../use-case';
import {
    FindTransactionsByDateRangeUseCaseInput,
    FindTransactionsByDateRangeUseCaseOutput,
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

		const result = await this.transactionRepository.findByDateRange(startDate, endDate, userId);
		return result.map(transaction => ({
			id: transaction.id.value,
			date: transaction.date,
			value: transaction.value,
			description: transaction.description,
			userId: transaction.userId.value,
			...transaction.timestamps.value,
		}));
	}
}
