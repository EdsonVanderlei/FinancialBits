export type UpdateTransactionUseCaseInput = {
	id: string;
	date: number;
	value: number;
	description: string;
};
export type UpdateTransactionUseCaseOutput = {
	id: string;
	date: number;
	value: number;
	userId: string;
	description: string;
	createdAt: number;
	updatedAt: number;
};
