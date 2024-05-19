import { AppError } from '../../../shared/classes/app-error';
import { JWTUtils } from '../../../shared/utils/jwt/jwt.utils';
import { DataObject } from '../data-object';

export class JWT extends DataObject<string> {
	constructor(value: string) {
		super(value);
	}

	static create(payload: object, secretKey: string, options?: { expiresIn?: string | number }) {
		return new JWT(JWTUtils.generate(payload, secretKey, options));
	}

	public validate() {
		if (!JWTUtils.regex(this.value)) {
			throw new AppError('Invalid token', 400);
		}
	}

	public get payload() {
		return JWTUtils.decode(this.value) ?? undefined;
	}

	public verify(secretKey: string) {
		return JWTUtils.verify(this.value, secretKey) ?? undefined;
	}
}
