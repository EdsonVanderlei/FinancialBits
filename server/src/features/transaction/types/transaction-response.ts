import { Category } from 'src/entities/category';
import { Wallet } from 'src/entities/wallet.entity';
import { CategoryResponse } from 'src/features/category/types/category-response';
import { WalletResponse } from 'src/features/wallet/types/wallet-response';

export type GroupedTransactionsResponse = {
	date: string;
	values: TransactionResponse[];
};

export type TransactionResponse = {
	id: string;
	date: string;
	title: string;
	value: number;

	createdAt: Date;
	updatedAt: Date;

	wallet: WalletResponse;
	category?: CategoryResponse;
};
