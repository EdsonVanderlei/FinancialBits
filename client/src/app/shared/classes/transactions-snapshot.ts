import { Transaction } from '../types/transaction';

export class TransactionsSnapshot {
  public date?: Date;
  public income: number = 0;
  public outcome: number = 0;
  public balance: number = 0;
  public transactions: Transaction[];

  constructor(transactions: Transaction[], date?: Date) {
    this.transactions = transactions;
    this.date = date;
    this.updateValues();
  }

  private updateValues() {
    this.income = 0;
    this.outcome = 0;
    this.transactions
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .forEach((transaction) => {
        if (transaction.value > 0) this.income += transaction.value;
        else if (transaction.value < 0) this.outcome += transaction.value;
      });
    this.balance = this.income + this.outcome;
  }
}
