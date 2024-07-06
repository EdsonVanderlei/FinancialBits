import { Component, effect, inject, signal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AreaComponent } from '../../shared/components/area/area.component';
import { TransactionsState } from '../../shared/states/transactions.state';
import { Transaction } from '../../shared/types/transaction';
import { TransactionsListItemComponent } from './ui/transactions-list-item/transactions-list-item.component';
import { DialogModule } from 'primeng/dialog';
import { TransactionFormComponent } from '../../shared/components/transaction-form/transaction-form.component';
import { TransactionProps } from '../../shared/types/transaction.props';

@Component({
  standalone: true,
  selector: 'app-transactions-list',
  imports: [AreaComponent, TransactionsListItemComponent, DialogModule, TransactionFormComponent],
  template: `
    <app-area title="Transactions" containerClasses="overflow-auto">
      <div class="h-full overflow-auto flex flex-col gap-4">
        @for (transaction of transactionsState.transactions(); track transaction.id; let i = $index) {
        <app-transactions-list-item [transaction]="transaction" (edit)="onEdit($event)" (delete)="onDelete($event)" />
        @if(i !== (transactionsState.transactions().length - 1)){
        <div class="border-0 border-b border-solid" [style.border-color]="'var(--surface-border)'"></div>
        } }
      </div>
    </app-area>
    <p-dialog modal [draggable]="false" header="Edit Transaction" [(visible)]="dialogVisible">
      <app-transaction-form [transaction]="transaction" (submitEvent)="onSubmit($event)" />
    </p-dialog>
  `,
})
export class TransactionsListComponent {
  private confirmationService = inject(ConfirmationService);
  transactionsState = inject(TransactionsState);

  dialogVisible = false;
  transaction?: Transaction;

  constructor() {
    effect(() => {
      if (this.transactionsState.transactions()) {
        this.dialogVisible = false;
        this.transaction = undefined;
      }
    });
  }

  onEdit(transaction: Transaction) {
    this.transaction = transaction;
    this.dialogVisible = true;
  }

  onSubmit(event: TransactionProps) {
    this.transactionsState.update({ ...event, id: event.id! });
  }

  onDelete(transaction: Transaction) {
    this.confirmationService.confirm({
      icon: 'pi pi-exclamation-triangle',
      header: 'Delete Confirmation',
      message: 'Do you really want to delete the transaction?',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => this.transactionsState.delete(transaction),
    });
  }
}
