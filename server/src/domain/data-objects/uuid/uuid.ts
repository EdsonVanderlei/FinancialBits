import { v4, validate } from 'uuid';
import { AppError } from '../../../shared/classes/app-error';
import { DataObject } from '../data-object';

export class UUID extends DataObject<string> {
	constructor(value?: string) {
		super(value ?? v4());
	}

	public validate() {
		const regExp = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
		if (!regExp.test(this.value) || !validate(this.value)) {
			throw new AppError('Invalid identifier', 400);
		}
	}
}
