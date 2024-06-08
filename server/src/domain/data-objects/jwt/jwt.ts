import { JwtPayload, SignOptions, sign, verify } from 'jsonwebtoken';
import { AppError } from '../../../shared/classes/app-error';
import { DataObject } from '../data-object';

export class JWT extends DataObject<string> {
	constructor(value: string) {
		super(value);
	}

	static create(payload: object, secretKey: string, options?: SignOptions) {
		const token = sign(payload, secretKey, options);
		return new JWT(token);
	}

	public validate() {
		const regExp = /(?:[\w-]*\.){2}[\w-]*/;
		if (!regExp.test(this.value ?? '')) {
			throw new AppError('Invalid token', 400);
		}
	}

	public verify(secretKey: string) {
		try {
			return verify(this.value, secretKey) as JwtPayload;
		} catch (e: any) {
			throw new AppError(e.message, 500);
		}
	}
}
