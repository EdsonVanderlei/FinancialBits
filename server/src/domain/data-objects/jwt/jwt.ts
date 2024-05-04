import { SignOptions } from 'jsonwebtoken';
import { AppError } from '../../../shared/classes/app-error';
import { JWTUtils } from '../../../shared/utils/jwt/jwt.utils';
import { DataObject } from '../data-object';

export class JWT extends DataObject<string> {
	constructor(value: string, validate: boolean = true) {
		super(value);
		if (validate) this.validate();
	}

	static generate<T extends { sub: string; name: string }>(payload: T, secretKey: string, options?: SignOptions) {
		const token = JWTUtils.generate(payload, secretKey, options);
		return new JWT(token);
	}

	public validate() {
		if (!JWTUtils.regex(this.value)) {
			throw new AppError('Invalid token', 400);
		}
	}

	public get payload() {
		return JWTUtils.decode(this.value);
	}

	public verify(secretKey: string) {
		return JWTUtils.verify(this.value, secretKey);
	}
}
