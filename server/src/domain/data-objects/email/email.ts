import { AppError } from '../../../shared/classes/app-error';
import { DataObject } from '../data-object';

export class Email extends DataObject<string> {
	constructor(value: string, validate: boolean = true) {
		super(value);
		if (validate) this.validate();
	}

	public validate() {
		const regExp = new RegExp(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/);
		if (!regExp.test(this.value)) {
			throw new AppError('Invalid email', 400);
		}
	}
}
