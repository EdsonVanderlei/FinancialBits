import { Component, inject } from '@angular/core';
import { TransactionState } from '../../shared/states/transactions.state';
import { CurrencyPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-overview',
  imports: [CurrencyPipe],
  template: `
    <h2 class="m-0 mb-4">Overview</h2>
    <div class="flex items-center gap-8">
      <div>
        <h1 class="m-0">{{ transactionState.income() | currency }}</h1>
        <small class="text-color-secondary">Income</small>
      </div>
      <span class="text-color-secondary mb-4">-</span>
      <div>
        <h1 class="m-0">{{ transactionState.outcome() | currency }}</h1>
        <small class="text-color-secondary">Outcome</small>
      </div>
      <span class="text-color-secondary mb-4">=</span>
      <div>
        <h1 class="m-0">{{ transactionState.balance() | currency }}</h1>
        <small class="text-color-secondary">Balance</small>
      </div>
    </div>
  `,
  styles: `
  .text-color-secondary{
    color: var(--text-color-secondary);
  }`,
})
export class OverviewComponent {
  transactionState = inject(TransactionState);
}
