import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { CardComponent } from '../../../shared/components/card.component';
import { TransactionsState } from '../../states/transactions.state';
import { GroupedTransactions } from '../../types/transaction/grouped-transactions';
import { Transaction } from '../../types/transaction/transaction';

@Component({
  standalone: true,
  selector: 'app-balance',
  imports: [CurrencyPipe, CardComponent],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss',
})
export class BalanceComponent {
  private transactionsState = inject(TransactionsState);

  income = computed(() =>
    this.reduceTransactionsValues(
      (transaction) => transaction.value > 0,
      this.transactionsState.filteredGroups(),
    ),
  );

  outcome = computed(() =>
    this.reduceTransactionsValues(
      (transaction) => transaction.value < 0,
      this.transactionsState.filteredGroups(),
    ),
  );

  balance = computed(() => this.income() + this.outcome());

  private reduceTransactionsValues = (
    filterFn: (t: Transaction) => boolean,
    groups?: GroupedTransactions[],
  ) =>
    groups?.reduce((acc, curr) => {
      curr.values.forEach((transaction) => {
        if (filterFn(transaction)) acc += transaction.value;
      });
      return acc;
    }, 0) ?? 0;
}
