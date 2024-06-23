import { Signal, WritableSignal, computed, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

export class State<T> {
  private state: WritableSignal<T>;
  private initialValue: T;

  value: Signal<T>;
  value$: Observable<T>;

  constructor(initialValue: T) {
    this.initialValue = initialValue;
    this.state = signal(this.initialValue);
    this.value = computed(() => this.state());
    this.value$ = toObservable(this.value);
  }

  setValue(value: T) {
    this.state.set(value);
  }

  resetValue() {
    this.state.set(this.initialValue);
  }
}
