import { Transaction } from './transaction';

export type GroupedTransactions = {
  date: Date;
  values: Transaction[];
};
