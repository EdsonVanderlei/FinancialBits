import { Injectable } from '@angular/core';
import { first, map } from 'rxjs';
import { GroupedTransactions } from '../types/transaction/grouped-transactions';
import { Transaction } from '../types/transaction/transaction';
import {
  CreateTransactionAction,
  DeleteTransactionAction,
  UpdateTransactionAction,
} from '../types/transaction/transaction-actions';
import { BaseService } from '../../shared/classes/base-service';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService extends BaseService {
  protected override baseEndpoint = '/transactions';

  getAll(minDate: Date, maxDate: Date) {
    const params = { minDate: minDate.getTime(), maxDate: maxDate.getTime() };
    return this.http.get<GroupedTransactions[]>(this.baseUrl, { params }).pipe(
      first(),
      map((res) => res.map(this.handleGroup)),
    );
  }

  create(values: CreateTransactionAction) {
    return this.http
      .post<GroupedTransactions>(this.baseUrl, values)
      .pipe(first(), map(this.handleGroup));
  }

  update(values: UpdateTransactionAction) {
    return this.http
      .post<GroupedTransactions>(`${this.baseUrl}/${values.id}`, values)
      .pipe(first(), map(this.handleGroup));
  }

  delete(values: DeleteTransactionAction) {
    return this.http.delete<void>(`${this.baseUrl}/${values.id}`).pipe(
      first(),
      map(() => values),
    );
  }

  private handleGroup = (group: GroupedTransactions): GroupedTransactions => ({
    date: new Date(group.date),
    values: group.values.map(this.handleTransaction),
  });

  private handleTransaction = (transaction: Transaction): Transaction => ({
    ...transaction,
    date: new Date(transaction.date),
    createdAt: new Date(transaction.createdAt),
    updatedAt: new Date(transaction.updatedAt),
  });
}
