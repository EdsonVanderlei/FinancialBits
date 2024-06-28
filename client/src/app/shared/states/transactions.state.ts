import { Injectable, effect, inject, signal } from '@angular/core';
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

  constructor() {
    toObservable(this.periodState.dateRange).pipe(
      takeUntilDestroyed(),
      switchMap((dateRange) => this.transactionsService.getByDateRange(dateRange.from, dateRange.to))
    ).subscribe(transactions => this.transactions.set(transactions));
  }
}
