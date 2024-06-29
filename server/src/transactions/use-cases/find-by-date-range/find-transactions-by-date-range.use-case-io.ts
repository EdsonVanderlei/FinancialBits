export type FindTransactionsByDateRangeUseCaseInput = {
	userId: string;
	startDate: number;
	endDate: number;
	groupBy?: string;
};

export type FindTransactionsByDateRangeUseCaseOutputData = {
	id: string;
	date: Date;
	value: number;
	description: string;
	userId: string;
	createdAt: Date;
	updatedAt?: Date;
};

export type FindTransactionsByDateRangeUseCaseOutputArr = FindTransactionsByDateRangeUseCaseOutputData[];

export type FindTransactionsByDateRangeUseCaseOutputGrouped = {
	date: Date;
	transactions: FindTransactionsByDateRangeUseCaseOutputData[];
}[];

export type FindTransactionsByDateRangeUseCaseOutput =
	| FindTransactionsByDateRangeUseCaseOutputArr
	| FindTransactionsByDateRangeUseCaseOutputGrouped;
