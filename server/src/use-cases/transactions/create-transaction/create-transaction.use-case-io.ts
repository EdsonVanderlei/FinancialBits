export type CreateTransactionUseCaseInput = {
	value: number;
	date: number;
	description: string;
	userId: string;
};
export type CreateTransactionUseCaseOutput = {
	date: number;
	value: number;
	userId: string;
	description: string;
	createdAt: number;
};
