import { Transaction } from '../types/transaction';

export class TransactionsSnapshot {
  public income: number;
  public outcome: number;
  public balance: number;

  constructor(transactions: Transaction[]) {
    this.income = transactions.reduce((acc, curr) => (curr.value > 0 ? (acc += curr.value) : acc), 0);
    this.outcome = transactions.reduce((acc, curr) => (curr.value < 0 ? (acc += curr.value) : acc), 0);
    this.balance = this.income - this.outcome;
  }
}
