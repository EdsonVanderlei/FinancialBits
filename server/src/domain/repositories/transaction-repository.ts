import { Transaction } from './../entities/transaction/transaction';
import { CreateTransactionProps } from '../types/transaction/create-transaction-props';
import { LoadTransactionProps } from '../types/transaction/load-transaction-props';
import { Repository } from './repository';

export interface TransactionRepository extends Repository<Transaction> {
	exists(where: Partial<LoadTransactionProps>): Promise<boolean>;
	findAll(where?: Partial<LoadTransactionProps>): Promise<Transaction[]>;
	findOne(where: Partial<LoadTransactionProps>): Promise<Transaction | null>;
	create(props: CreateTransactionProps): Promise<Transaction>;
	update(props: LoadTransactionProps): Promise<Transaction | null>;
	delete(where: Partial<LoadTransactionProps>): Promise<{ deleteCount: number }>;
}
