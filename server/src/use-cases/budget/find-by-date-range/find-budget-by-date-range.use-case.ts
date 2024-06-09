import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { TransactionRepository } from '../../../domain/repositories/transaction/transaction.repository';
import { Budget } from '../../../shared/classes/budget';
import { UseCase } from '../../use-case';
import {
	FindBudgetByDateRangeUseCaseInput,
	FindBudgetByDateRangeUseCaseOuput,
} from './find-budget-by-date-range.use-case-io';

export class FindBudgetByDateRangeUseCase
	implements UseCase<FindBudgetByDateRangeUseCaseInput, FindBudgetByDateRangeUseCaseOuput>
{
	constructor(private transactionRepository: TransactionRepository) {}

	async exec(input: FindBudgetByDateRangeUseCaseInput) {
		const userId = UUID.create(input.userId);
		const startDate = new Date(input.startDate);
		const endDate = new Date(input.endDate);

		let transactions = await this.transactionRepository.findByDateRange(userId, startDate, endDate);
		const budget = new Budget(userId, startDate, endDate, transactions);

		return budget.asString();
	}
}
