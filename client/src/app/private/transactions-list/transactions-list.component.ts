import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TransactionState } from '../../shared/states/transactions.state';

@Component({
  standalone: true,
  selector: 'app-transactions-list',
  imports: [DatePipe, ButtonModule, CurrencyPipe],
  template: `
    <h2 class="m-0 mb-4">Transactions</h2>

    <div class="overflow-auto flex flex-col gap-4">
      @for (transaction of transactions(); track transaction.id) {
      <div class="flex justify-between items-center p-2 rounded" [style.background-color]="'var(--surface-ground)'">
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
      }
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
  transactions = this.transactionState.transactions;
}
