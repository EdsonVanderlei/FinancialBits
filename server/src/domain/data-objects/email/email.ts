import { AppError } from '../../../shared/classes/app-error';
import { DataObject } from '../data-object';

export class Email extends DataObject<string> {
	private constructor(value: string) {
		super(value);
	}

	static create(value: string) {
		const email = Email.load(value);
		email.validate();
		return email;
	}

	static load(value: string) {
		return new Email(value);
	}

	public validate() {
		const regExp = new RegExp(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/);
		if (!regExp.test(this.value)) {
			throw new AppError('Invalid email', 400);
		}
	}
}
