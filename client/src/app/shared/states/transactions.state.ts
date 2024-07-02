import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { TransactionsSnapshot } from '../classes/transactions-snapshot';
import { TransactionsService } from '../services/transactions.service';
import { Action } from '../types/action';
import { Snapshot } from '../types/snapshot';
import { Transaction } from '../types/transaction';
import { PeriodState } from './period.state';

@Injectable({
  providedIn: 'root',
})
export class TransactionsState {
  private periodState = inject(PeriodState);
  private transactionsService = inject(TransactionsService);
  // Source
  private _error = signal<any>(null);
  private _loading = signal<boolean>(false);
  private _snapshot = signal<Snapshot>(new Snapshot([]));
  // Actions
  private actionBuilder = Action.builder(this._error, this._loading);
  create = this.actionBuilder(this.transactionsService.create);
  // Accessors
  error = computed(() => this._error());
  loading = computed(() => this._loading());
  income = computed(() => this._snapshot().income);
  outcome = computed(() => this._snapshot().outcome);
  balance = computed(() => this._snapshot().balance);
  transactions = computed(() => this._snapshot().transactions);

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
      .subscribe((transactions) => this._snapshot.set(new Snapshot(transactions)));
    // Reducers
    this.create.reducer.subscribe((transaction) =>
      this._snapshot.update((snapshot) => new Snapshot([...snapshot.transactions, transaction]))
    );
  }

  private inDateRange(transaction: Transaction) {
    const dateRange = this.periodState.dateRange();
    return (
      transaction.date.getTime() >= dateRange.from.getTime() && transaction.date.getTime() <= dateRange.to.getTime()
    );
  }

  push(transaction: Transaction) {
    if (!this.inDateRange(transaction)) return;
    const date = new Date(transaction.date.getTime());
    date.setHours(0, 0, 0, 0);

    this._snapshots.update((snapshots) => {
      const transactions = [transaction];
      return snapshots
        .filter((snapshot) => {
          if (snapshot.date?.getTime() === date?.getTime()) {
            transactions.push(...snapshot.transactions);
            return false;
          }
          return true;
        })
        .concat(new TransactionsSnapshot(transactions, date))
        .sort((a, b) => b.date!.getTime() - a.date!.getTime());
    });
  }
}
