import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AreaComponent } from '../../shared/components/area/area.component';
import { TitleDirective } from '../../shared/directives/title.directive';
import { TransactionsState } from '../../shared/states/transactions.state';

@Component({
  standalone: true,
  selector: 'app-overview',
  imports: [CurrencyPipe, AreaComponent, TitleDirective],
  template: `
    <app-area title="Overview" containerClasses="flex items-start justify-between">
      <div class="grid">
        <h1 appTitle>{{ transactionState.income() | currency }}</h1>
        <small class="text-xs text-neutral-500">Income</small>
      </div>
      <span class="text-2xl leading-9 font-semibold text-neutral-500">-</span>
      <div class="grid">
        <h1 appTitle>{{ transactionState.outcome() * -1 | currency }}</h1>
        <small class="text-xs text-neutral-500">Outcome</small>
      </div>
      <span class="text-2xl leading-9 font-semibold text-neutral-500">=</span>
      <div class="grid">
        <h1 appTitle>{{ transactionState.balance() | currency }}</h1>
        <small class="text-xs text-neutral-500">Balance</small>
      </div>
    </app-area>
  `,
})
export class OverviewComponent {
  transactionState = inject(TransactionsState);
}
