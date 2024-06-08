export type UpdateTransactionUseCaseInput = {
	id: string;
	userId: string;
	date: number | string;
	value: number;
	description: string;
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
