export type CreateTransactionUseCaseInput = {
	value: number;
	date: number;
	description: string;
	userId: string;
};
export type CreateTransactionUseCaseOutput = {
	id: string;
	date: number;
	value: number;
	userId: string;
	description: string;
	createdAt: number;
};