export type CreateTransactionUseCaseInput = {
	date: number | string;
	value: number;
	description: string;
	userId: string;
};
export type CreateTransactionUseCaseOutput = {
	id: string;
	date: Date;
	value: number;
	description: string;
	userId: string;
	createdAt: Date;
	updatedAt?: Date;
};
