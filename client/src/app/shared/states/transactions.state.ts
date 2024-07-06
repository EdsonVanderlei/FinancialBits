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
  private createAction = this.actionBuilder(this.transactionsService.create);
  private deleteAction = this.actionBuilder(this.transactionsService.delete);
  // Accessors
  error = computed(() => this._error());
  loading = computed(() => this._loading());

  income = computed(() => this._snapshot().income);
  outcome = computed(() => this._snapshot().outcome);
  balance = computed(() => this._snapshot().balance);
  transactions = computed(() => this._snapshot().transactions);

  constructor() {
    toObservable(this.periodState.dateRange).pipe(
      takeUntilDestroyed(),
      switchMap((dateRange) => this.transactionsService.getByDateRange(dateRange.from, dateRange.to))
    ).subscribe((transactions) => this._snapshot.set(new Snapshot(transactions)));
    // Reducers
    this.createAction.reducer.subscribe((transaction) => this._snapshot.update(
      snapshot => new Snapshot([...snapshot.transactions, transaction])
    ));
    this.deleteAction.reducer.subscribe((id) => this._snapshot.update(
      snapshot => new Snapshot(snapshot.transactions.filter(transaction => transaction.id !== id))
    ))
  }

  create(value: Pick<Transaction, 'date' | 'description' | 'value'>) {
    this.createAction.run(value);
  }

  delete(id: string) {
    this.deleteAction.run(id);
  }
}
