import { computed, Injectable, signal } from '@angular/core';
import { first, map, tap } from 'rxjs';
import { Wallet } from '../types/wallet/wallet';
import {
  CreateWalletAction,
  DeleteWalletAction,
  UpdateWalletAction,
} from '../types/wallet/wallet-actions';
import { BaseService } from '../../shared/classes/base-service';

@Injectable({
  providedIn: 'root',
})
export class WalletsService extends BaseService {
  protected override baseEndpoint = '/wallets';

  getAll() {
    return this.http.get<Wallet[]>(this.baseUrl).pipe(
      first(),
      map((wallets) => wallets.map(this.handleDate)),
    );
  }

  getById(id: string) {
    return this.http
      .get<Wallet>(`${this.baseUrl}/${id}`)
      .pipe(first(), map(this.handleDate));
  }

  create(values: CreateWalletAction) {
    return this.http
      .post<Wallet>(this.baseUrl, values)
      .pipe(first(), map(this.handleDate));
  }

  update(values: UpdateWalletAction) {
    return this.http
      .post<Wallet>(`${this.baseUrl}/${values.id}`, values)
      .pipe(first(), map(this.handleDate));
  }

  delete(values: DeleteWalletAction) {
    return this.http.delete<void>(`${this.baseUrl}/${values.id}`).pipe(
      first(),
      map(() => values.id),
    );
  }

  private handleDate = (wallet: Wallet): Wallet => ({
    ...wallet,
    createdAt: new Date(wallet.createdAt),
    updatedAt: new Date(wallet.updatedAt),
  });
}
