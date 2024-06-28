import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Transaction } from '../types/transaction';
import { PeriodState } from './period.state';
import { TransactionsService } from '../services/transactions.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { TransactionsSnapshot } from '../classes/transactions-snapshot';

@Injectable({
  providedIn: 'root',
})
export class TransactionState {
  private periodState = inject(PeriodState);
  private transactionsService = inject(TransactionsService);

  transactions = signal<Transaction[]>([]);
  private transactionsSnapshot = computed(() => new TransactionsSnapshot(this.transactions()));
  
  income = computed(() => this.transactionsSnapshot().income);
  outcome = computed(() => this.transactionsSnapshot().outcome);
  balance = computed(() => this.transactionsSnapshot().balance);

  constructor() {
    toObservable(this.periodState.dateRange)
      .pipe(
        takeUntilDestroyed(),
        switchMap((dateRange) => this.transactionsService.getByDateRange(dateRange.from, dateRange.to))
      )
      .subscribe((transactions) => this.transactions.set(transactions));
  }
}
