import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { TransactionsSnapshot } from '../classes/transactions-snapshot';
import { TransactionsService } from '../services/transactions.service';
import { PeriodState } from './period.state';

@Injectable({
  providedIn: 'root',
})
export class TransactionState {
  private periodState = inject(PeriodState);
  private transactionsService = inject(TransactionsService);

  private _snapshots = signal<TransactionsSnapshot[]>([]);

  private _mainSnapshot = computed(
    () =>
      new TransactionsSnapshot(
        Array.from(this._snapshots().values())
          .map((snapshot) => snapshot.transactions)
          .flat(1)
      )
  );

  snapshots = computed(() => this._snapshots());
  mainSnapshot = computed(() => this._mainSnapshot());

  constructor() {
    toObservable(this.periodState.dateRange)
      .pipe(
        takeUntilDestroyed(),
        switchMap((dateRange) => this.transactionsService.getByDateRange(dateRange.from, dateRange.to))
      )
      .subscribe((snapshots) =>
        this._snapshots.set(snapshots.map((snapshot) => new TransactionsSnapshot(snapshot.transactions, snapshot.date)))
      );
  }
}
