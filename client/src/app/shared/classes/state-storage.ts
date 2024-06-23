import { effect } from '@angular/core';
import { State } from './state';

export class StateStorage<T extends object> extends State<T | null> {
  private storageKey: string;

  constructor(storageKey: string) {
    const value = localStorage.getItem(storageKey);
    const valueObj = value ? (JSON.parse(value) as T) : null;
    super(valueObj);
    this.storageKey = storageKey;

    effect(() => {
      const value = this.value();
      if (value) localStorage.setItem(this.storageKey, JSON.stringify(value));
    });
  }

  clearValue() {
    this.setValue(null);
    localStorage.removeItem(this.storageKey);
  }
}
