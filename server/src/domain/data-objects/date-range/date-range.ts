import { AppError } from '../../../shared/classes/app-error';
import { DataObject } from '../data-object';

export class DateRange extends DataObject<{ start: number; end: number }> {
	constructor(start: number, end: number) {
		super({ start, end });
	}

	validate() {
		if (this.value.start < 0) {
			throw new AppError('Invalid start date', 400);
		}

		if (this.value.end < 0) {
			throw new AppError('Invalid end date', 400);
		}

		if (this.value.end <= this.value.start) {
			throw new AppError('End date should be greater than start date', 400);
		}
	}
}
