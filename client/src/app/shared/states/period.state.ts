import { Injectable, computed, signal } from '@angular/core';
import { PeriodEnum } from '../types/enums/period.enum';

@Injectable({
  providedIn: 'root',
})
export class PeriodState {
  public period = signal(PeriodEnum.Month);

  startDate = computed(() => {
    const today = new Date();
    const period = this.period();
    return new Date(today.getUTCFullYear(), today.getUTCMonth() - period + 1, 1, 0, 0, 0, 0);
  });

  endDate = computed(() => {
    const today = new Date();
    return new Date(today.getUTCFullYear(), today.getUTCMonth() + 1, 0, 23, 59, 59, 999);
  });
}
