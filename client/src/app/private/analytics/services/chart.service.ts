import { Injectable, Signal, computed, inject } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { TransactionsSnapshot } from '../../../shared/classes/transactions-snapshot';
import { TransactionState } from '../../../shared/states/transactions.state';

@Injectable({ providedIn: 'root' })
export class ChartService {
  private transactionState = inject(TransactionState);

  private getSnapshotsProp = (snapshots: Signal<TransactionsSnapshot[]>, prop: keyof TransactionsSnapshot) =>
    snapshots()
      .map((snapshot) => snapshot[prop])
      .reverse();

  income = computed(() => this.getSnapshotsProp(this.transactionState.snapshots, 'income') as number[]);
  outcome = computed(() => this.getSnapshotsProp(this.transactionState.snapshots, 'outcome') as number[]);
  balance = computed(() => this.getSnapshotsProp(this.transactionState.snapshots, 'balance') as number[]);

  labels = computed(() =>
    this.getSnapshotsProp(this.transactionState.snapshots, 'date').map((date) =>
      (date as Date)?.toISOString().split('T')[0].split('-').join('/')
    )
  );

  getOptions = (surfaceBorder: string): ChartOptions<'line'> => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { displayColors: false },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        ticks: { display: false },
        grid: { color: surfaceBorder },
      },
    },
  });
}
