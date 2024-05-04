import { Transaction } from '../../../domain/entities/transaction/transaction';

export type LoadTransactionsUseCaseInput = {
	userId?: string;
};
export type LoadTransactionsUseCaseOutput = Transaction[];
