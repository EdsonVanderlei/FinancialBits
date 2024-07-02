import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TransactionsState } from '../../shared/states/transactions.state';

@Component({
  standalone: true,
  selector: 'app-overview',
  imports: [CurrencyPipe],
  template: `
    <h2 class="m-0">Overview</h2>
    <div class="flex items-center justify-between p-4">
      <div>
        <h1 class="m-0">{{ transactionState.mainSnapshot().income | currency }}</h1>
        <small class="text-color-secondary">Income</small>
      </div>
      <span class="text-xl text-color-secondary mb-4">-</span>
      <div>
        <h1 class="m-0">{{ transactionState.mainSnapshot().outcome * -1 | currency }}</h1>
        <small class="text-color-secondary">Outcome</small>
      </div>
      <span class="text-xl text-color-secondary mb-4">=</span>
      <div>
        <h1 class="m-0">{{ transactionState.mainSnapshot().balance | currency }}</h1>
        <small class="text-color-secondary">Balance</small>
      </div>
    </div>
  `,
  styles: `
    .text-color-secondary{
      color: var(--text-color-secondary);
    }
  `,
})
export class OverviewComponent {
  transactionState = inject(TransactionsState);
}
