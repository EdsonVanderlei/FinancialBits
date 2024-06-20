import { v4, validate } from 'uuid';
import { AppError } from '../../../classes/app-error';
import { DataObject } from '../data-object';

export class UUID extends DataObject<string> {
	private constructor(value: string) {
		super(value);
	}

	static create(value: string) {
		const uuid = UUID.load(value);
		uuid.validate();
		return uuid;
	}

	static load(value: string) {
		return new UUID(value);
	}

	static generate() {
		return UUID.load(v4());
	}

	public validate() {
		const regExp = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
		if (!regExp.test(this.value) || !validate(this.value)) {
			throw new AppError('Invalid identifier', 400);
		}
	}
}
