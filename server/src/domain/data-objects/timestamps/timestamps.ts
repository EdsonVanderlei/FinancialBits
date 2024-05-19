import { AppError } from '../../../shared/classes/app-error';
import { DataObject } from '../data-object';

export class Timestamps extends DataObject<{ createdAt: number; updatedAt?: number }> {
	constructor(createdAt?: number, updatedAt?: number) {
		super({ createdAt: createdAt ?? new Date().getTime(), updatedAt });
	}
	
	validate() {
		if (this.value.createdAt < 0) {
			throw new AppError('Invalid created at date', 400);
		}

		if (!!this.value.updatedAt && this.value.updatedAt < 0) {
			throw new AppError('Invalid updated at date', 400);
		}
	}
}
