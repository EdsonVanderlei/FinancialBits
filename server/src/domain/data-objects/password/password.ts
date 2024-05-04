import { AppError } from '../../../shared/classes/app-error';
import { NumberUtils } from '../../../shared/utils/number/number.utils';
import { PasswordUtils } from '../../../shared/utils/password/password.utils';
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
		const result = NumberUtils.minMax(this.value.length, this.minLength, this.maxLength);
		if (result < 0) {
			throw new AppError('Password length must be greater than 4', 400);
		}

		if (result > 0) {
			throw new AppError('Password length must be lower than 16', 400);
		}
	}

	public compare(target: string) {
		return PasswordUtils.compare(target, this.value);
	}
}
