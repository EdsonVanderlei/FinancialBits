import { Injectable, computed, signal } from '@angular/core';
import { PeriodEnum } from '../types/enums/period.enum';

@Injectable({
  providedIn: 'root',
})
export class PeriodState {
  public period = signal(PeriodEnum.Month);

  dateRange = computed(() => {
    const today = new Date();
    const period = this.period();
    return {
      from: new Date(today.getUTCFullYear(), today.getUTCMonth() - period + 1, 1, 0, 0, 0, 0),
      to: new Date(today.getUTCFullYear(), today.getUTCMonth() + 1, 0, 23, 59, 59, 999),
    };
  });
}
