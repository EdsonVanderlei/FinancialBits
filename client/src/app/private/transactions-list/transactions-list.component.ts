import { Component, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AreaComponent } from '../../shared/components/area/area.component';
import { TransactionsState } from '../../shared/states/transactions.state';
import { Transaction } from '../../shared/types/transaction';
import { TransactionsListItemComponent } from './ui/transactions-list-item/transactions-list-item.component';

@Component({
  standalone: true,
  selector: 'app-transactions-list',
  imports: [AreaComponent, TransactionsListItemComponent],
  template: `
    <app-area title="Transactions" containerClasses="overflow-auto">
      <div class="h-full overflow-auto flex flex-col gap-4">
        @for (transaction of transactionsState.transactions(); track transaction.id; let i = $index) {
        <app-transactions-list-item [transaction]="transaction" (delete)="onDelete($event)" />
        @if(i !== (transactionsState.transactions().length - 1)){
        <div class="border-0 border-b border-solid" [style.border-color]="'var(--surface-border)'"></div>
        } }
      </div>
    </app-area>
  `,
})
export class TransactionsListComponent {
  private confirmationService = inject(ConfirmationService);
  transactionsState = inject(TransactionsState);

  onDelete(transaction: Transaction) {
    this.confirmationService.confirm({
      icon: 'pi pi-exclamation-triangle',
      header: 'Delete Confirmation',
      message: 'Do you really want to delete the transaction?',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => this.transactionsState.delete(transaction.id),
    });
  }
}
