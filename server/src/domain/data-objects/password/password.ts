import { compareSync, hashSync } from 'bcrypt';
import { AppError } from '../../../shared/classes/app-error';
import { DataObject } from '../data-object';

export class Password extends DataObject<string> {
	constructor(value: string) {
		super(value);
	}

	public validate() {
		if (this.value.length <= 4) {
			throw new AppError('Password length must be greater than 4', 400);
		}

		if (this.value.length >= 16) {
			throw new AppError('Password length must be lower than 16', 400);
		}
	}

	public hash() {
		this.value = hashSync(this.value, 10);
	}

	public compare(password: string) {
		return compareSync(password, this.value);
	}
}
