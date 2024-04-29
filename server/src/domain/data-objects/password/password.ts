import { AppError } from '../../../shared/classes/app-error';
import { PasswordUtils } from '../../../shared/utils/password/password.utils';
import { ValidationUtils } from '../../../shared/utils/validation/validation.utils';
import { DataObject } from '../data-object';

export class Password extends DataObject<string> {
	constructor(
		value: string,
		validate: boolean = true,
		hash: boolean = true,
		private minLength: number = 5,
		private maxLength: number = 15
	) {
		super(value);
		if (validate) this.validate();
		if (hash) this.value = PasswordUtils.hash(this.value);
	}
	public validate() {
		if (!ValidationUtils.minLength(this.value, this.minLength)) {
			throw new AppError('Password length must be greater than 4', 400);
		}

		if (!ValidationUtils.maxLength(this.value, this.maxLength)) {
			throw new AppError('Password length must be lower than 16', 400);
		}
	}
}
