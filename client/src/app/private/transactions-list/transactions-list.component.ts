import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TransactionState } from '../../shared/states/transactions.state';

@Component({
  standalone: true,
  selector: 'app-transactions-list',
  imports: [DatePipe, ButtonModule, CurrencyPipe],
  template: `
    <h2 class="m-0">Transactions</h2>

    <div class="overflow-auto flex flex-col gap-4 p-4">
      @for (transaction of mainSnapshot().transactions; track transaction.id; let i = $index) {
      <div class="flex justify-between items-center">
        <div class="grid gap-1">
          <span>{{ transaction.description }}</span>
          <small class="text-xs text-neutral-500">{{ transaction.date | date }}</small>
        </div>
        <div class="flex items-center gap-2">
          <span class="font-bold">{{ transaction.value | currency }}</span>
          <span [class]="transaction.value > 0 ? 'pi pi-arrow-down-left' : 'pi pi-arrow-up-right'"></span>
          <p-button text severity="secondary" size="small" icon="pi pi-ellipsis-v"></p-button>
        </div>
      </div>
      @if(i !== mainSnapshot().transactions.length -1){
      <div class="border-0 border-b border-solid" [style.border-color]="'var(--surface-border)'"></div>
      } }
    </div>
  `,
  styles: `
    :host {
      display:grid;
      grid-template-rows: min-content auto
    }

    .divider {
      height: 1px;
      border-bottom: 1px solid var(--surface-border);
    }
  `,
})
export class TransactionsListComponent {
  private transactionState = inject(TransactionState);
  mainSnapshot = this.transactionState.mainSnapshot;
}
