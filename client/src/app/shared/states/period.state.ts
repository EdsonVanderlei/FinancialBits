import { Injectable, computed } from '@angular/core';
import { State } from '../classes/state';
import { PeriodEnum } from '../types/enums/period.enum';

@Injectable({
  providedIn: 'root',
})
export class PeriodState {
  public period = new State(PeriodEnum.Month);

  startDate = computed(() => {
    const today = new Date();
    const period = this.period.value();
    return new Date(today.getUTCFullYear(), today.getUTCMonth() - period + 1, 1, 0, 0, 0, 0);
  });

  endDate = computed(() => {
    const today = new Date();
    return new Date(today.getUTCFullYear(), today.getUTCMonth() + 1, 0, 23, 59, 59, 999);
  });
}
