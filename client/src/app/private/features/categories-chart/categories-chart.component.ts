import { Component, computed, inject } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import { CardComponent } from '../../../shared/components/card.component';
import { ChartBaseDirective } from '../../directives/chart-base.directive';
import { CategoriesState } from '../../states/categories.state';
import { TransactionsState } from '../../states/transactions.state';

@Component({
  standalone: true,
  selector: 'app-categories-chart',
  imports: [ChartModule, CardComponent],
  templateUrl: './categories-chart.component.html',
  styleUrl: './categories-chart.component.scss',
})
export class CategoriesChartComponent extends ChartBaseDirective {
  private categoriesState = inject(CategoriesState);
  private transactionsState = inject(TransactionsState);

  chartData = computed<ChartData>(() => {
    let categories = this.categoriesState.filteredCategories() ?? [];
    let groups = this.transactionsState.filteredGroups() ?? [];

    categories = [...categories]
      .map((category) => ({
        ...category,
        value: groups
          .map((group) => group.values)
          .flat(1)
          .filter((transaction) => transaction.category?.id === category.id)
          .reduce((acc, curr) => (acc += curr.value), 0),
      }))
      .sort((a: any, b: any) => b.value - a.value)
      .filter(category => category.value !== 0);

    return {
      labels: categories.map((category) => category.name),
      datasets: [
        {
          data: categories.map((category: any) => category.value),
          backgroundColor: categories.map((category) => category.color),
          borderWidth: 4,
          borderColor: '#171717',
        },
      ],
    };
  });

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: 0 },
    plugins: {
      legend: {
        position: 'left',
        labels: {
          usePointStyle: true,
          color: this.chartColors.text,
        },
      },
    },
  };
}
