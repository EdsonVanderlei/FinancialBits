import { IsNumber, Min } from 'class-validator';
import { GroupedTransactionsResponse, TransactionResponse } from './transaction-response';

export class GetAllTransactionsRequestQuery {
	@IsNumber()
	@Min(1)
	minDate: number;
	@IsNumber()
	@Min(1)
	maxDate: number;
}

export type GetAllTransactionsResponseBody = GroupedTransactionsResponse[]