import { AppError } from '../../../classes/app-error';
import { DataObject } from '../data-object';

export class Timestamps extends DataObject<{ createdAt: Date; updatedAt?: Date }> {
	private constructor(value: { createdAt: Date; updatedAt?: Date }) {
		super(value);
	}

	static create(value: { createdAt: Date; updatedAt?: Date }) {
		const timestamps = Timestamps.load(value);
		timestamps.validate();
		return timestamps;
	}

	static load(value: { createdAt: Date; updatedAt?: Date }) {
		return new Timestamps(value);
	}

	static generate() {
		return Timestamps.load({ createdAt: new Date() });
	}

	validate() {
		if (isNaN(this.value.createdAt.getTime())) {
			throw new AppError('Invalid created at date', 400);
		}
		if (typeof this.value.updatedAt !== 'undefined' && isNaN(this.value.updatedAt?.getTime())) {
			throw new AppError('Invalid updated at date', 400);
		}
	}
}
