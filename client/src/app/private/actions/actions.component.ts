import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { first } from 'rxjs';
import { TransactionsService } from '../../shared/services/transactions.service';
import { TransactionsState } from '../../shared/states/transactions.state';
import { Transaction } from '../../shared/types/transaction';
import { TransactionFormComponent } from './ui/transaction-form/transaction-form.component';

@Component({
  standalone: true,
  selector: 'app-actions',
  imports: [ButtonModule, DialogModule, TransactionFormComponent],
  template: `
    <h2 class="m-0">Actions</h2>

    <div class="grid grid-cols-2 gap-4 p-4">
      <p-button
        styleClass="w-full"
        severity="secondary"
        icon="pi pi-arrow-up-right text-red-400"
        label="Transfer"
        (onClick)="onTransfer()"
      ></p-button>
      <p-button
        styleClass="w-full"
        severity="secondary"
        icon="pi pi-arrow-down-left text-green-400"
        label="Receive"
        (onClick)="onReceive()"
      ></p-button>
    </div>

    <p-dialog modal [draggable]="false" [header]="dialogHeader" [(visible)]="dialogVisible">
      <app-transaction-form
        [visible]="dialogVisible"
        [positiveTransactionValue]="positiveTransactionValue"
        (submitEvent)="onSubmit($event)"
      />
    </p-dialog>
  `,
})
export class ActionsComponent {
  private transactionsState = inject(TransactionsState);
  private transactionsService = inject(TransactionsService);

  dialogHeader?: string;
  dialogVisible = false;
  positiveTransactionValue = true;

  onTransfer() {
    this.positiveTransactionValue = false;
    this.openDialog();
  }

  onReceive() {
    this.positiveTransactionValue = true;
    this.openDialog();
  }

  private openDialog() {
    this.dialogHeader = this.positiveTransactionValue ? 'Receive Value' : 'Transfer Value';
    this.dialogVisible = true;
  }

  onSubmit(transaction: Pick<Transaction, 'value' | 'date' | 'description'>) {
    if (
      (this.positiveTransactionValue && transaction.value < 0) ||
      (!this.positiveTransactionValue && transaction.value > 0)
    )
      transaction.value = transaction.value * -1;
    this.transactionsService
      .create(transaction)
      .pipe(first())
      .subscribe((res) => {
        this.transactionsState.push(res);
        this.dialogVisible = false;
      });
  }
}
