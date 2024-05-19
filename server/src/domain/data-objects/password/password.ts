import { AppError } from '../../../shared/classes/app-error';
import { NumberUtils } from '../../../shared/utils/number/number.utils';
import { PasswordUtils } from '../../../shared/utils/password/password.utils';
import { DataObject } from '../data-object';

export class Password extends DataObject<string> {
	constructor(value: string) {
		super(value);
	}

	public validate(minLength: number = 5, maxLength: number = 15) {
		const minMaxRes = NumberUtils.minMax(this.value.length, minLength, maxLength);
		if (minMaxRes < 0) {
			throw new AppError('Password length must be greater than 4', 400);
		}

		if (minMaxRes > 0) {
			throw new AppError('Password length must be lower than 16', 400);
		}
	}

	public hash() {
		this.value = PasswordUtils.hash(this.value);
	}

	public compare(target: string) {
		return PasswordUtils.compare(target, this.value);
	}
}
