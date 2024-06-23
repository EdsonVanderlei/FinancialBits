import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PeriodEnum } from '../../../../shared/types/enums/period.enum';

@Component({
  standalone: true,
  selector: 'app-period-select',
  imports: [SelectButtonModule, FormsModule],
  template: ` <p-selectButton
    [options]="periodOptions"
    [(ngModel)]="period"
    optionLabel="label"
    optionValue="value"
  />`,
})
export class PeriodSelectComponent {
  period = PeriodEnum.Month;

  periodOptions = [
    { label: 'Month', value: PeriodEnum.Month },
    { label: '2 Months', value: PeriodEnum.TwoMonths },
    { label: '6 Months', value: PeriodEnum.SixMonths },
    { label: 'Year', value: PeriodEnum.Year },
  ];
}
