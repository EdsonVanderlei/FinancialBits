import { effect } from '@angular/core';
import { StorageUtils } from '../utils/storage.utils';
import { State } from './state';

export abstract class StorageState<T> extends State<T> {
  protected storageKey: string;
  protected storageJsonValue: boolean;

  constructor(storageKey: string, storageJsonValue: boolean = true) {
    const storageValue = StorageUtils.get<T>(storageKey, storageJsonValue);
    super(storageValue);

    this.storageKey = storageKey;
    this.storageJsonValue = storageJsonValue;

    effect(() => {
      const value = this.state();
      if (value) this.setStorage(value);
    });
  }

  protected setStorage(value: T | null) {
    if (!this.storageKey) return;
    if (!value) {
      StorageUtils.remove(this.storageKey);
      return;
    }
    StorageUtils.set(this.storageKey, value, this.storageJsonValue);
  }

  protected getStorage(): T | null {
    if (!this.storageKey) return null;
    return StorageUtils.get<T>(this.storageKey, this.storageJsonValue);
  }
}
