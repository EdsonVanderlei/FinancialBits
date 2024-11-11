export type TransactionResponse = {
	id: string;
	date: Date;
	title: string;
	value: number;
	createdAt: Date;
	updatedAt: Date;
	walletId: string;
	categoryId?: string;
};
