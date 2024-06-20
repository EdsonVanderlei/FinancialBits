import { Signal, WritableSignal, computed, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

export abstract class State<T> {
  private _state: WritableSignal<T | null>;

  public state: Signal<T | null>;
  public state$: Observable<T | null>;

  constructor(initialValue: T | null = null) {
    this._state = signal(initialValue ?? null);

    this.state = computed(() => this._state());
    this.state$ = toObservable(this.state);
  }

  public setState(value: T) {
    this._state.set(value);
  }
}
