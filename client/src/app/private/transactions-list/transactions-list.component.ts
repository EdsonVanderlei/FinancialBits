import { Component, inject } from '@angular/core';
import { TransactionsState } from '../../shared/states/transactions.state';
import { TransactionsListItemComponent } from './ui/transactions-list-item/transactions-list-item.component';
import { AreaComponent } from '../../shared/components/area/area.component';

@Component({
  standalone: true,
  selector: 'app-transactions-list',
  imports: [AreaComponent, TransactionsListItemComponent],
  template: `
    <app-area title="Transactions" containerClasses="overflow-auto">
      <div class="h-full overflow-auto flex flex-col gap-4">
        @for (transaction of transactionState.transactions(); track transaction.id; let i = $index) {
        <app-transactions-list-item [transaction]="transaction" />
        @if(i !== (transactionState.transactions().length - 1)){
        <div class="border-0 border-b border-solid" [style.border-color]="'var(--surface-border)'"></div>
        } }
      </div>
    </app-area>
  `,
})
export class TransactionsListComponent {
  transactionState = inject(TransactionsState);
}
