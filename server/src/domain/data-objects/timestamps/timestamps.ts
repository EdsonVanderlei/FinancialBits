import { DataObject } from '../data-object';

export class Timestamps extends DataObject<{ createdAt: Date; updatedAt?: Date }> {
	constructor(createdAt?: Date, updatedAt?: Date) {
		super({ createdAt: createdAt ?? new Date(), updatedAt });
	}

	validate() {
		throw new Error('Timestamps validate not implemented.');
	}
}
