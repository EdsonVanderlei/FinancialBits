import { Transaction } from '../../../domain/entities/transaction/transaction';

export type FindBudgetByDateRangeUseCaseInput = {
	startDate: string | number;
	endDate: string | number;
	userId: string;
};

export type FindBudgetByDateRangeUseCaseOuput = {
	userId: string,
	startDate: string,
	endDate: string,
	balance: number,
	totalIncome: number,
	totalOutcome: number,
	transactions: Transaction[],
}
