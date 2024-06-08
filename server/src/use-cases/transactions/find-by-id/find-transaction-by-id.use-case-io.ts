import { Transaction } from "../../../domain/entities/transaction/transaction";

export type FindTransactionByIdUseCaseInput = {
	id: string;
	userId: string;
};
export type FindTransactionByIdUseCaseOutput = Transaction
