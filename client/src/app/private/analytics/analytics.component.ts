import { Component, Signal, computed, inject } from '@angular/core';
import { ChartData } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import { ChartService } from './services/chart.service';
import { getDocumentColors } from './utils/get-document-colors';

@Component({
  standalone: true,
  selector: 'app-analytics',
  imports: [ChartModule],
  template: `
    <h2 class="m-0">Analytics</h2>
    <div class="flex-auto p-4">
      <p-chart type="line" height="100%" [data]="data()" [options]="options" />
    </div>
  `,
  host: { class: 'flex flex-col' },
})
export class AnalyticsComponent {
  private chartService = inject(ChartService);
  private documentColors = getDocumentColors(document.documentElement);

  options = this.chartService.getOptions(this.documentColors.surfaceBorder);
  data: Signal<ChartData> = computed(() => ({
    labels: this.chartService.labels(),
    datasets: [
      {
        label: 'Icome',
        data: this.chartService.income(),
        borderColor: this.documentColors.green,
      },
      {
        label: 'Outcome',
        data: this.chartService.outcome(),
        borderColor: this.documentColors.red,
      },
      {
        label: 'Balance',
        data: this.chartService.balance(),
        borderColor: this.documentColors.grey,
      },
    ],
  }));
}
