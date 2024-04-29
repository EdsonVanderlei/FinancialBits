import { AppError } from '../../../shared/classes/app-error';
import { ValidationUtils } from '../../../shared/utils/validation/validation.utils';
import { DataObject } from '../data-object';

export class Email extends DataObject<string> {
	constructor(value: string, validate: boolean = true) {
		super(value);
		if (validate) this.validate();
	}

	public validate() {
		if (!ValidationUtils.email(this.value)) {
			throw new AppError('Invalid email', 400);
		}
	}
}
