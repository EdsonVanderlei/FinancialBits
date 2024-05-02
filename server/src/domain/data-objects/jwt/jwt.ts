import { SignOptions } from 'jsonwebtoken';
import { AppError } from '../../../shared/classes/app-error';
import { TokenUtils } from '../../../shared/utils/token/token.utils';
import { ValidationUtils } from '../../../shared/utils/validation/validation.utils';
import { DataObject } from '../data-object';

export class JWT extends DataObject<string> {
	constructor(value: string, validate: boolean = true) {
		super(value);
		if (validate) this.validate();
	}

	static generate<T extends { sub: string; name: string }>(payload: T, secretKey: string, options?: SignOptions) {
		const token = TokenUtils.generate(payload, secretKey, options);
		return new JWT(token);
	}

	public validate() {
		if (!ValidationUtils.jwt(this.value)) {
			throw new AppError('Invalid token', 400);
		}
	}

	public get payload() {
		return TokenUtils.decode(this.value);
	}

	public verify(secretKey: string) {
		return TokenUtils.verify(this.value, secretKey);
	}
}
