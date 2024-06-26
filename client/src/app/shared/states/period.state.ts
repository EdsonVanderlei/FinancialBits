import { Injectable, computed } from '@angular/core';
import { State } from '../classes/state';
import { PeriodEnum } from '../types/enums/period.enum';

@Injectable({
  providedIn: 'root',
})
export class PeriodState {
  private period = new State(PeriodEnum.Month);

  private today = computed(() => {
    this.period.value();
    return new Date();
  });

  current = computed(() => {
    return this.period.value();
  });

  startDate = computed(() => {
    const today = this.today();
    const period = this.period.value();
    return new Date(today.getUTCFullYear(), today.getUTCMonth() - period + 1, 1, 0, 0, 0, 0);
  });

  endDate = computed(() => {
    const today = this.today();
    return new Date(today.getUTCFullYear(), today.getUTCMonth() + 1, 0, 23, 59, 59, 999);
  });

  setPeriod(value: PeriodEnum) {
    this.period.setValue(value);
  }
}
