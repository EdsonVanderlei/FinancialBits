import { Category } from "../category/category";
import { Wallet } from "../wallet/wallet";

export type Transaction = {
	id: string;
	date: Date;
	title: string;
	value: number;
	createdAt: Date;
	updatedAt: Date;
	wallet: Wallet;
	category?: Category;
};
