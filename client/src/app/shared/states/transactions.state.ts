import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Transaction } from '../types/transaction';
import { PeriodState } from './period.state';
import { TransactionsService } from '../services/transactions.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionState {
  private periodState = inject(PeriodState);
  private transactionsService = inject(TransactionsService);

  transactions = signal<Transaction[]>([]);
  income = computed(() => this.transactions().reduce((acc, curr) => (curr.value > 0 ? (acc += curr.value) : acc), 0));
  outcome = computed(() => this.transactions().reduce((acc, curr) => (curr.value < 0 ? (acc += curr.value) : acc), 0));
  balance = computed(() => this.income() - this.outcome());

  constructor() {
    toObservable(this.periodState.dateRange)
      .pipe(
        takeUntilDestroyed(),
        switchMap((dateRange) => this.transactionsService.getByDateRange(dateRange.from, dateRange.to))
      )
      .subscribe((transactions) => this.transactions.set(transactions));
  }
}
