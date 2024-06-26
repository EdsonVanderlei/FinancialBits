import { PeriodEnum } from './enums/period.enum';

export type Period = {
  current: PeriodEnum;
  today: Date;
};
