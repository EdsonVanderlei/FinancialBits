import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import { CardComponent } from '../../../shared/components/card.component';
import { ChartBaseDirective } from '../../directives/chart-base.directive';
import { TransactionsState } from '../../states/transactions.state';

@Component({
  standalone: true,
  selector: 'app-transactions-chart',
  imports: [ChartModule, CardComponent],
  providers: [CurrencyPipe, DatePipe],
  templateUrl: './transactions-chart.component.html',
  styleUrl: './transactions-chart.component.scss',
})
export class TransactionsChartComponent extends ChartBaseDirective {
  private datePipe = inject(DatePipe);
  private currencyPipe = inject(CurrencyPipe);
  private transactionsState = inject(TransactionsState);

  chartData = computed<ChartData>(() => {
    const periodRange = this.transactionsState.periodRange();
    let groups = this.transactionsState.filteredGroups() ?? [];
    groups = [...groups].reverse();

    const labels = Array(periodRange.max.getDate())
      .fill(0)
      .map((_, i) =>
        this.datePipe.transform(
          new Date(
            periodRange.max.getFullYear(),
            periodRange.max.getMonth(),
            i + 1,
          ),
        ),
      );

    const datasets: ChartDataset[] = [
      {
        tension: 0.1,
        label: 'Entrada',
        data: Array(labels.length).fill(0),
        fill: true,
        backgroundColor: this.chartColors.green + '24',
        borderColor: this.chartColors.green,
        pointBackgroundColor: this.chartColors.green,
      },
      {
        tension: 0.1,
        label: 'Saída',
        data: Array(labels.length).fill(0),
        fill: true,
        backgroundColor: this.chartColors.red + '24',
        borderColor: this.chartColors.red,
        pointBackgroundColor: this.chartColors.red,
      },
      {
        tension: 0.1,
        label: 'Balanço',
        data: Array(labels.length).fill(0),
        fill: false,
        borderWidth: 2,
        borderColor: this.chartColors.white,
        pointRadius: 2,
        pointBackgroundColor: this.chartColors.white,
      },
    ];

    for (let i = 0; i < labels.length; i++) {
      const date = labels[i];
      for (const group of groups) {
        const groupDate = this.datePipe.transform(group.date);
        if (groupDate === date) {
          for (const transaction of group.values) {
            (datasets[transaction.value > 0 ? 0 : 1].data[i] as number) +=
              transaction.value;
          }
          datasets[2].data[i] =
            (datasets[0].data[i] as number) + (datasets[1].data[i] as number);
        }
      }
    }

    return { labels, datasets };
  });

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: 0 },
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        bodyAlign: 'right',
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.dataset.label}: ${this.currencyPipe.transform(tooltipItem.raw as number) ?? '-'}`,
        },
      },
    },
    scales: {
      y: {
        grid: { color: this.chartColors.grid },
        ticks: {
          color: this.chartColors.text,
          callback: (tickValue) => this.currencyPipe.transform(tickValue),
        },
      },
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { display: false },
      },
    },
  };
}
