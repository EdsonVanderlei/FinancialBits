import { Component, effect, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TransactionsState } from '../../shared/states/transactions.state';
import { Transaction } from '../../shared/types/transaction';
import { TransactionFormComponent } from '../../shared/components/transaction-form/transaction-form.component';
import { AreaComponent } from '../../shared/components/area/area.component';

@Component({
  standalone: true,
  selector: 'app-actions',
  imports: [ButtonModule, AreaComponent, DialogModule, TransactionFormComponent],
  template: `
    <app-area title="Actions" containerClasses="grid grid-cols-2 gap-x-4">
      <p-button
        styleClass="w-full h-full"
        severity="secondary"
        icon="pi pi-arrow-up-right text-red-400"
        label="Transfer"
        (onClick)="openDialog(false)"
      ></p-button>
      <p-button
        styleClass="w-full h-full"
        severity="secondary"
        icon="pi pi-arrow-down-left text-green-400"
        label="Receive"
        (onClick)="openDialog(true)"
      ></p-button>
    </app-area>

    <p-dialog modal [draggable]="false" [header]="dialogHeader" [(visible)]="dialogVisible">
      <app-transaction-form (submitEvent)="onSubmit($event)" />
    </p-dialog>
  `,
})
export class ActionsComponent {
  private transactionsState = inject(TransactionsState);

  dialogHeader?: string;
  dialogVisible = false;
  positiveTransactionValue = true;

  constructor() {
    effect(() => {
      if (this.transactionsState.transactions()) this.dialogVisible = false;
    });
  }

  openDialog(positive: boolean) {
    this.positiveTransactionValue = positive;
    this.dialogHeader = positive ? 'Receive Value' : 'Transfer Value';
    this.dialogVisible = true;
  }

  onSubmit(transaction: Pick<Transaction, 'value' | 'date' | 'description'>) {
    if (
      (this.positiveTransactionValue && transaction.value < 0) ||
      (!this.positiveTransactionValue && transaction.value > 0)
    )
      transaction.value = transaction.value * -1;
    this.transactionsState.create(transaction);
  }
}
