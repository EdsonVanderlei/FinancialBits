import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PeriodEnum } from '../../../../shared/types/enums/period.enum';

@Component({
  standalone: true,
  selector: 'app-period-select',
  imports: [SelectButtonModule, FormsModule],
  template: ` <p-selectButton
    [options]="periodOptions"
    [allowEmpty]="false"
    [ngModel]="period()"
    (ngModelChange)="periodChange.emit($event)"
    optionLabel="label"
    optionValue="value"
  />`,
})
export class PeriodSelectComponent {
  period = input<PeriodEnum>();
  periodChange = output<PeriodEnum>();

  periodOptions = [
    { label: 'Month', value: PeriodEnum.Month },
    { label: '2 Months', value: PeriodEnum.TwoMonths },
    { label: '6 Months', value: PeriodEnum.SixMonths },
    { label: 'Year', value: PeriodEnum.Year },
  ];
}
