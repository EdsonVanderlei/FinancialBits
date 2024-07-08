import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { PeriodEnum } from '../types/enums/period.enum';
import { resetDateHours } from '../utils/reset-date-hours';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class PeriodState {
  private storageService = inject(StorageService);

  date = signal(resetDateHours(new Date()));
  period = signal(this.storageService.get<PeriodEnum>('period') ?? PeriodEnum.Month);

  range = computed(() => {
    const today = this.date();
    const period = this.period();
    const from = new Date(today.getUTCFullYear(), today.getUTCMonth() - period + 1, 1, 0, 0, 0, 0);
    const to = new Date(today.getUTCFullYear(), today.getUTCMonth() + 1, 0, 23, 59, 59, 999);
    return { from, to };
  });

  constructor() {
    effect(() => {
      if (this.period()) this.storageService.set('period', this.period());
    });
  }
}
