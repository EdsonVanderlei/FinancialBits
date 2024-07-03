import { DatePipe } from '@angular/common';
import { Injectable, computed, inject } from '@angular/core';
import { TransactionsState } from '../../../shared/states/transactions.state';

@Injectable()
export class ChartService {
  private datePipe = inject(DatePipe);
  private transactionsState = inject(TransactionsState);

  income = computed(() => this.grouped().map((group) => group.income));
  outcome = computed(() => this.grouped().map((group) => group.outcome));
  balance = computed(() => this.grouped().map((group) => group.balance));
  labels = computed(() => this.grouped().map((group) => this.datePipe.transform(group.date)));

  private grouped = computed(() =>
    this.transactionsState
      .transactions()
      .reduce((acc, curr) => {
        const date = new Date(curr.date.getTime());
        date.setHours(0, 0, 0, 0);

        const income = curr.value > 0 ? curr.value : 0;
        const outcome = curr.value < 0 ? curr.value : 0;

        const group = acc.find((group) => group.date.getTime() === date.getTime());
        if (!group) {
          acc.push({ date, income, outcome, balance: income + outcome });
        } else {
          group.income += income;
          group.outcome += outcome;
          group.balance = income + outcome;
        }

        return acc;
      }, [] as { date: Date; income: number; outcome: number; balance: number }[])
      .reverse()
  );
}
