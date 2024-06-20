import { compareSync, hashSync } from 'bcrypt';
import { DataObject } from '../../../../shared/domain/data-objects/data-object';
import { AppError } from '../../../../shared/classes/app-error';

export class Password extends DataObject<string> {
	private constructor(value: string) {
		super(value);
	}

	static create(value: string) {
		const password = Password.load(value);
		password.validate();
		password.hash();
		return password;
	}

	static load(value: string) {
		return new Password(value);
	}

	private hash() {
		this.value = hashSync(this.value, 10);
	}

	public validate() {
		if (this.value.length <= 4) {
			throw new AppError('Password length must be greater than 4', 400);
		}

		if (this.value.length >= 16) {
			throw new AppError('Password length must be lower than 16', 400);
		}
	}

	public compare(password: string) {
		const result = compareSync(password, this.value);
		if (!result) throw new AppError('Invalid password', 401);
	}
}
