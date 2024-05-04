export type CreateTransactionUseCaseInput = {
	value: number;
	date: number;
	userId: string;
};
export type CreateTransactionUseCaseOutput = {
	date: number;
	value: number;
	userId: string;
	createdAt: number;
};
