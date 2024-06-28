import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Transaction } from '../types/transaction';
import { DateUtils } from '../utils/date.utils';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}transactions/`;

  private handleTransactionDates = (transaction: Transaction) =>
    DateUtils.handleDateProps(transaction, ['date', 'createdAt', 'updatedAt']);

  getByDateRange(from: Date, to: Date) {
    return this.httpClient
      .get<Transaction[]>(`${this.baseUrl}from/${from.getTime()}/to/${to.getTime()}`)
      .pipe(map((transactions) => transactions.map((transaction) => this.handleTransactionDates(transaction))));
  }
}
