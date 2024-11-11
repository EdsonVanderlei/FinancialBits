import { computed, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { WalletsService } from '../services/wallets.service';
import { Wallet } from '../types/wallet/wallet';
import {
  CreateWalletAction,
  DeleteWalletAction,
  UpdateWalletAction,
} from '../types/wallet/wallet-actions';

@Injectable({
  providedIn: 'root',
})
export class WalletsState {
  private walletsService = inject(WalletsService);

  private _wallets = signal<Wallet[] | undefined>(undefined);
  private _selectedWallets = signal<string[] | undefined>(undefined);

  wallets = computed(() => this._wallets());
  selectedWallets = computed(() => this._selectedWallets());
  filteredWallets = computed(() =>
    this._wallets()?.filter((_) => this.selectedWallets()?.includes(_.id)),
  );

  init() {
    this.walletsService.getAll().subscribe({
      next: (wallets) => {
        this._wallets.set(wallets);
        this._selectedWallets.set(wallets.map((w) => w.id));
      },
      error: () => {
        this._wallets.set(undefined);
        this._selectedWallets.set(undefined);
      },
    });
  }

  refreshById(id: string) {
    this.walletsService
      .getById(id)
      .subscribe((res) => this.pushWallet(res, false));
  }

  create(values: CreateWalletAction) {
    return this.walletsService
      .create(values)
      .pipe(tap((wallet) => this.pushWallet(wallet, true)));
  }

  update(values: UpdateWalletAction) {
    return this.walletsService
      .update(values)
      .pipe(tap((wallet) => this.pushWallet(wallet, false)));
  }

  delete(values: DeleteWalletAction) {
    return this.walletsService
      .delete(values)
      .pipe(tap(() => this.removeWallet(values.id)));
  }

  setSelectedWallets(value: string[]) {
    this._selectedWallets.set(value);
  }

  private pushWallet(wallet: Wallet, refreshSelected: boolean) {
    this._wallets.update((wallets) =>
      wallets
        ?.filter((_) => _.id !== wallet.id)
        ?.concat(wallet)
        ?.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime()),
    );
    if (refreshSelected) this.refreshSelectedWallets();
  }

  private removeWallet(id: string) {
    this._wallets.update((wallets) =>
      wallets
        ?.filter((_) => _.id !== id)
        ?.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()),
    );
    this._selectedWallets.update((values) => values?.filter((_) => _ !== id));
  }

  private refreshSelectedWallets() {
    const wallets = this._wallets();
    const value = wallets?.map((wallet) => wallet.id);
    this._selectedWallets.set(value);
  }
}
