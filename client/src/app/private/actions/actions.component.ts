import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TransactionFormComponent } from './ui/transaction-form/transaction-form.component';

@Component({
  standalone: true,
  selector: 'app-actions',
  imports: [ButtonModule, DialogModule, TransactionFormComponent],
  template: `
    <h2 class="m-0 col-span-2">Actions</h2>
    <p-button
      styleClass="w-full"
      severity="secondary"
      icon="pi pi-arrow-up-right"
      label="Transfer"
      (onClick)="onTransfer()"
    ></p-button>
    <p-button
      styleClass="w-full"
      severity="secondary"
      icon="pi pi-arrow-down-left"
      label="Receive"
      (onClick)="onReceive()"
    ></p-button>

    <p-dialog modal [draggable]="false" [header]="dialogHeader" [(visible)]="dialogVisible">
      <app-transaction-form
        [visible]="dialogVisible"
        [positiveTransactionValue]="positiveTransactionValue"
        (submit)="onSubmit($event)"
      />
    </p-dialog>
  `,
  host: {
    class: 'grid grid-cols-2 gap-4',
  },
})
export class ActionsComponent {
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

  onSubmit(
    value: Partial<{
      value: number;
      date: Date;
      description: string;
    }>
  ) {}
}
