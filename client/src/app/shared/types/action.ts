import { WritableSignal } from '@angular/core';
import { EMPTY, Observable, Subject, catchError, switchMap, tap } from 'rxjs';

export class Action<T, U> {
  private source$ = new Subject<T>();

  reducer = this.source$.pipe(
    tap(() => this.loadingSig.set(true)),
    switchMap((value) => this.requestFn(value)),
    tap(() => this.loadingSig.set(false)),
    catchError((err) => {
      this.errorSig.set(err);
      return EMPTY;
    })
  );

  private constructor(
    private errorSig: WritableSignal<any>,
    private loadingSig: WritableSignal<boolean>,
    private requestFn: (value: T) => Observable<U>
  ) {}

  static builder =
    (errorSig: WritableSignal<any>, loadingSig: WritableSignal<boolean>) =>
    <T, U>(requestFn: (value: T) => Observable<U>) =>
      new Action(errorSig, loadingSig, requestFn);

  run(value: T) {
    this.source$.next(value);
  }
}
