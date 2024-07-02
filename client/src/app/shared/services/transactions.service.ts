import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Transaction } from '../types/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}transactions`;

  private handleTransactionDates = (transaction: Transaction): Transaction => ({
    ...transaction,
    date: new Date(transaction.date),
    createdAt: new Date(transaction.createdAt),
    updatedAt: transaction.updatedAt && new Date(transaction.updatedAt),
  });

  getByDateRange(from: Date, to: Date) {
    return this.httpClient
      .get<Transaction[]>(`${this.baseUrl}/from/${from.getTime()}/to/${to.getTime()}`)
      .pipe(map((transactions) => transactions.map((transaction) => this.handleTransactionDates(transaction))));
  }

  create = (values: Pick<Transaction, 'date' | 'description' | 'value'>) =>
    this.httpClient
      .post<Transaction>(this.baseUrl, values)
      .pipe(map((transaction) => this.handleTransactionDates(transaction)));
}
