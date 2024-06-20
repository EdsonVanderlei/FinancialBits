import { Injectable } from '@angular/core';
import { StorageState } from '../classes/storage-state';
import { Tokens } from '../models/tokens';
import { StorageUtils } from '../utils/storage.utils';

@Injectable({
  providedIn: 'root',
})
export class TokensState extends StorageState<Tokens> {
  constructor() {
    super('refreshToken', false);
  }

  protected override setStorage(value: Tokens) {
    if (!this.storageKey) return;
    StorageUtils.set(this.storageKey, value.refresh, this.storageJsonValue);
  }

  protected override getStorage() {
    if (!this.storageKey) return null;
    const storageValue = StorageUtils.get<string>(this.storageKey, this.storageJsonValue);
    return { access: '', refresh: storageValue ?? '' };
  }
}
