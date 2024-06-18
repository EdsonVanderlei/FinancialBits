export type UpdateTransactionUseCaseInput = {
	id: string;
	date: number | string;
	value: number;
	description: string;
	userId: string;
};
export type UpdateTransactionUseCaseOutput = {
	id: string;
	date: Date;
	value: number;
	description: string;
	userId: string;
	createdAt: Date;
	updatedAt?: Date;
};
