import { CurrencyPipe, DatePipe } from '@angular/common';
import { Injectable, Signal, computed, inject } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { TransactionsSnapshot } from '../../../shared/classes/transactions-snapshot';
import { TransactionsState } from '../../../shared/states/transactions.state';

@Injectable()
export class ChartService {
  private datePipe = inject(DatePipe);
  private currencyPipe = inject(CurrencyPipe);
  private transactionState = inject(TransactionsState);

  private getSnapshotsProp = (snapshots: Signal<TransactionsSnapshot[]>, prop: keyof TransactionsSnapshot) =>
    snapshots()
      .map((snapshot) => snapshot[prop])
      .reverse();

  income = computed(() => this.getSnapshotsProp(this.transactionState.snapshots, 'income') as number[]);
  outcome = computed(() => this.getSnapshotsProp(this.transactionState.snapshots, 'outcome') as number[]);
  balance = computed(() => this.getSnapshotsProp(this.transactionState.snapshots, 'balance') as number[]);

  labels = computed(() =>
    this.getSnapshotsProp(this.transactionState.snapshots, 'date').map((date) =>
      this.datePipe.transform((date as Date).getTime())
    )
  );

  getOptions = (surfaceBorder: string): ChartOptions<'line'> => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        bodyAlign: 'right',
        titleAlign: 'center',
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.dataset.label}: ${this.currencyPipe.transform(tooltipItem.raw?.toString())}`,
        },
      },
    },
    onHover: (ev, el, chart) => {
      const ctx = chart.ctx;
      const top = chart.chartArea.top;
      const bottom = chart.chartArea.bottom;
      ctx.save();
      chart.getDatasetMeta(0).data.forEach((point) => {
        if (point.active) {
          ctx.beginPath();
          ctx.strokeStyle = surfaceBorder;
          ctx.moveTo(point.x, top);
          ctx.lineTo(point.x, bottom);
          ctx.stroke();
          ctx.closePath();
        }
      });
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { maxTicksLimit: 7 },
      },
      y: {
        grid: { color: surfaceBorder },
        ticks: { display: false },
      },
    },
  });
}
