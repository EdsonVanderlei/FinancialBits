import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Signal, computed, inject } from '@angular/core';
import { ChartData } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import { AreaComponent } from '../../shared/components/area/area.component';
import { ChartService } from './services/chart.service';
import { getChartOptions } from './utils/get-chart-options';
import { getDocumentColors } from './utils/get-document-colors';

@Component({
  standalone: true,
  selector: 'app-analytics',
  imports: [ChartModule, AreaComponent],
  providers: [ChartService, DatePipe, CurrencyPipe],
  template: `
    <app-area title="Analytics">
      <p-chart type="line" height="100%" [data]="data()" [options]="options" />
    </app-area>
  `,
  host: { class: 'flex flex-col' },
})
export class AnalyticsComponent {
  private chartService = inject(ChartService);
  private documentColors = getDocumentColors(document.documentElement);

  options = getChartOptions(this.documentColors.surfaceBorder);
  
  data: Signal<ChartData> = computed(() => ({
    labels: this.chartService.labels(),
    datasets: [
      {
        tension: 0.1,
        label: 'Icome',
        data: this.chartService.income(),
        borderColor: this.documentColors.green,
        backgroundColor: this.documentColors.green,
      },
      {
        tension: 0.1,
        label: 'Outcome',
        data: this.chartService.outcome(),
        borderColor: this.documentColors.red,
        backgroundColor: this.documentColors.red,
      },
      {
        tension: 0.1,
        label: 'Balance',
        data: this.chartService.balance(),
        borderColor: this.documentColors.grey,
        backgroundColor: this.documentColors.grey,
      },
    ],
  }));
}
