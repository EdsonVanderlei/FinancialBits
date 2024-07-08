import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { PeriodEnum } from '../../../../shared/types/enums/period.enum';

@Component({
  standalone: true,
  selector: 'app-period-select',
  imports: [FormsModule, CalendarModule, DropdownModule],
  template: `
    <p-calendar
      inputStyleClass="border-[var(--surface-border)] bg-transparent"
      view="month"
      dateFormat="mm/yy"
      [readonlyInput]="true"
      [ngModel]="date()"
      (ngModelChange)="dateChange.emit($event)"
    />
    <p-dropdown
      styleClass="border-[var(--surface-border)] bg-transparent"
      [options]="periodOptions"
      [ngModel]="period()"
      (ngModelChange)="periodChange.emit($event)"
    />
  `,
  host: { class: 'flex gap-4' },
})
export class PeriodSelectComponent {
  date = input<Date>();
  dateChange = output<Date>();

  period = input<PeriodEnum>();
  periodChange = output<PeriodEnum>();

  periodOptions = [
    { label: 'Month', value: PeriodEnum.Month },
    { label: '2 Months', value: PeriodEnum.TwoMonths },
    { label: '6 Months', value: PeriodEnum.SixMonths },
    { label: 'Year', value: PeriodEnum.Year },
  ];
}
