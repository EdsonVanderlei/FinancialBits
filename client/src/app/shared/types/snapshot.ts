import { Transaction } from './transaction';

export class Snapshot {
  income: number = 0;
  outcome: number = 0;
  balance: number = 0;
  transactions: Transaction[] = [];

  constructor(transactions: Transaction[]) {
    this.transactions = transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
    for (const transaction of this.transactions)
      if (transaction.value > 0) this.income += transaction.value;
      else if (transaction.value < 0) this.outcome += transaction.value;
    this.balance = this.income + this.outcome;
  }
}
