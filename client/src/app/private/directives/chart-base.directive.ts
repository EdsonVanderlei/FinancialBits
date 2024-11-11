import { Directive } from '@angular/core';

@Directive({
  selector: '[appChartBase]',
  standalone: true,
})
export abstract class ChartBaseDirective {
  protected chartColors = {
    grid: '#262626',
    text: '#737373',
    green: '#22c55e',
    red: '#ef4444',
    white: '#e5e5e5',
  };
}
