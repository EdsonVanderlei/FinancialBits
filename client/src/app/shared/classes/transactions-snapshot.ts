import { Transaction } from '../types/transaction';

export class TransactionsSnapshot {
  public date?: Date;
  public income: number;
  public outcome: number;
  public balance: number;
  public transactions: Transaction[];

  constructor(transactions: Transaction[], date?: Date) {
    this.transactions = transactions;
    this.date = date;
    this.income = 0;
    this.outcome = 0;
    transactions.forEach((transaction) => {
      if (transaction.value > 0) this.income += transaction.value;
      else if (transaction.value < 0) this.outcome += transaction.value;
    });
    this.balance = this.income - this.outcome;
  }
}
