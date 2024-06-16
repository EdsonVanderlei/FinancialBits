export type FindTransactionsByDateRangeUseCaseInput = {
	userId: string;
	startDate: number | string;
	endDate: number | string;
};
export type FindTransactionsByDateRangeUseCaseOutput = {
	id: string;
	date: Date;
	value: number;
	description: string;
	userId: string;
	createdAt: Date;
	updatedAt?: Date;
}[];
