import { computed, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { TransactionsService } from '../services/transactions.service';
import { GroupedTransactions } from '../types/transaction/grouped-transactions';
import {
  CreateTransactionAction,
  DeleteTransactionAction,
  UpdateTransactionAction,
} from '../types/transaction/transaction-actions';
import { DateUtils } from '../utils/date.utils';
import { CategoriesState } from './categories.state';
import { WalletsState } from './wallets.state';

@Injectable({
  providedIn: 'root',
})
export abstract class TransactionsState {
  private walletsState = inject(WalletsState);
  private categoriesState = inject(CategoriesState);
  private transactionsService = inject(TransactionsService);

  private _period = signal<Date>(DateUtils.nowMoth());
  private _groups = signal<GroupedTransactions[] | undefined>(undefined);

  period = computed(() => this._period());
  periodRange = computed(() => DateUtils.monthRange(this._period()));

  groups = computed<GroupedTransactions[] | undefined>(() => {
    const groups = this._groups();
    const wallets = this.walletsState.wallets() ?? [];
    const categories = this.categoriesState.categories() ?? [];

    return groups?.map((group) => ({
      ...group,
      values: group.values.map((transaction) => ({
        ...transaction,
        wallet: wallets.find((wallet) => wallet.id === transaction.wallet.id)!,
        category: categories.find(
          (category) => category.id === transaction.category?.id,
        ),
      })),
    }));
  });

  filteredGroups = computed(() =>
    this.groups()
      ?.filter((_) =>
        _.values.some((__) =>
          this.walletsState.selectedWallets()?.includes(__.wallet.id),
        ),
      )
      ?.filter((_) =>
        _.values.some(
          (__) =>
            !__.category ||
            this.categoriesState
              .selectedCategories()
              ?.includes(__.category?.id ?? ''),
        ),
      )
      ?.filter((_) => _.values.length > 0),
  );

  init() {
    this.refresh();
  }

  create(values: CreateTransactionAction) {
    return this.transactionsService.create(values).pipe(
      tap((res) => {
        this.pushGroup(res);
        this.walletsState.refreshById(res.values[0].wallet.id);
      }),
    );
  }

  update(values: UpdateTransactionAction) {
    return this.transactionsService.update(values).pipe(
      tap((res) => {
        this.pushGroup(res);
        this.walletsState.refreshById(res.values[0].wallet.id);
      }),
    );
  }

  delete(values: DeleteTransactionAction) {
    return this.transactionsService.delete(values).pipe(
      tap(() => {
        this.removeTransaction(values.id);
        this.walletsState.refreshById(values.walletId);
      }),
    );
  }

  setPeriod(value: Date | null) {
    const date = value ? DateUtils.resetHours(value) : DateUtils.now();
    if (
      date.getMonth() === this._period().getMonth() &&
      date.getFullYear() === this._period().getFullYear()
    )
      return;

    this._period.set(date);
    this.refresh();
  }

  private refresh() {
    const periodRange = this.periodRange();
    this.transactionsService
      .getAll(periodRange.min, periodRange.max)
      .subscribe({
        next: (res) => {
          this._groups.set(res);
        },
        error: () => this._groups.set(undefined),
      });
  }

  private pushGroup(group: GroupedTransactions) {
    this._groups.update((groups) => {
      if (!groups) return [group];

      const existingGroupIndex = groups.findIndex(
        (_) => _.date.getTime() === group.date.getTime(),
      );

      const ids = group.values.map((transaction) => transaction.id);
      groups = groups.map((group) => ({
        ...group,
        values: group.values.filter(
          (transaction) => !ids.includes(transaction.id),
        ),
      }));

      if (this.inPeriodRange(group.date)) {
        if (existingGroupIndex !== -1) {
          group.values.forEach((transaction) => {
            groups!.forEach((savedTransaction) => {
              const existingValueIndex = savedTransaction.values.findIndex(
                (value) => value.id === transaction.id,
              );
              if (existingValueIndex !== -1) {
                savedTransaction.values.splice(existingValueIndex, 1);
              }
            });

            const existingValueIndexInCurrent = groups![
              existingGroupIndex
            ].values.findIndex((value) => value.id === transaction.id);
            if (this.inPeriodRange(transaction.date)) {
              if (existingValueIndexInCurrent !== -1) {
                groups![existingGroupIndex].values[
                  existingValueIndexInCurrent
                ] = transaction;
              } else {
                groups![existingGroupIndex].values.push(transaction);
              }
            }
          });

          groups[existingGroupIndex].values.sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
          );
        } else {
          groups.push(group);
        }
      } else {
        if (existingGroupIndex !== -1) {
          groups.splice(existingGroupIndex, 1);
        }
      }

      groups.sort((a, b) => b.date.getTime() - a.date.getTime());
      groups = groups.filter((group) => group.values.length > 0);

      return groups;
    });
  }

  private inPeriodRange(date: Date) {
    const periodRange = this.periodRange();
    return (
      date.getTime() >= periodRange.min.getTime() &&
      date.getTime() <= periodRange.max.getTime()
    );
  }

  private removeTransaction(id: string) {
    this._groups.update((groups) =>
      groups?.map((group) => ({
        ...group,
        values: group.values.filter((transaction) => transaction.id !== id),
      })),
    );
  }
}
