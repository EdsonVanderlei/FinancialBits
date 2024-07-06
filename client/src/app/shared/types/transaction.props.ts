import { Transaction } from './transaction';

export type TransactionProps = Pick<Transaction, 'date' | 'description' | 'value'> & Partial<Pick<Transaction, 'id'>>;
