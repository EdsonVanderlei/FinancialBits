import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CardComponent } from '../../../shared/components/card.component';
import { FormFieldDirective } from '../../../shared/directives/form-field.directive';
import { TransactionsService } from '../../services/transactions.service';
import { TransactionsState } from '../../states/transactions.state';

@Component({
  standalone: true,
  selector: 'app-period-filter',
  imports: [FormsModule, CalendarModule, CardComponent, FormFieldDirective],
  templateUrl: './period-filter.component.html',
  styleUrl: './period-filter.component.scss',
})
export class PeriodFilterComponent {
  private transactionsState = inject(TransactionsState);
  period = this.transactionsState.period;

  onPeriodChange(value: Date | null) {
    this.transactionsState.setPeriod(value);
  }
}
