import { JsonWebTokenError, JwtPayload, SignOptions, decode, sign, verify } from 'jsonwebtoken';
import { AppError } from '../../../../shared/classes/app-error';
import { DataObject } from '../../../../shared/domain/data-objects/data-object';
import { UUID } from '../../../../shared/domain/data-objects/uuid/uuid';

export type JWTPayload = {
	sub: string;
	name: string;
	iat: number;
	exp?: number;
};

export class JWT extends DataObject<string> {
	public get payload(): JWTPayload | null {
		const payload = decode(this.value);
		if (!payload || typeof payload === 'string' || !payload.sub || !payload.name) return null;
		return {
			sub: payload.sub!,
			name: payload.name!,
			iat: payload.iat!,
			exp: payload.exp,
		};
	}

	private constructor(value: string) {
		super(value);
	}

	static create(value: string) {
		const jwt = JWT.load(value);
		jwt.validate();
		return jwt;
	}

	static load(value: string) {
		return new JWT(value);
	}

	static generate<T extends { userId: UUID; userFullName: string }>(
		payload: T,
		secretKey: string,
		options?: SignOptions,
	) {
		try {
			return JWT.load(sign({ ...payload, sub: payload.userId.value, name: payload.userFullName }, secretKey, options));
		} catch (e: unknown) {
			let message = (e as JsonWebTokenError).message.replace('jwt', 'token');
			message = message.charAt(0).toUpperCase() + message.slice(1);
			throw new AppError(message, 500);
		}
	}

	public validate() {
		const regExp = /(?:[\w-]*\.){2}[\w-]*/;
		if (!regExp.test(this.value ?? '')) {
			throw new AppError('Invalid token', 400);
		}
		if (!this.payload) {
			throw new AppError('Invalid token payload', 400);
		}
	}

	public verify(secretKey: string) {
		try {
			return verify(this.value, secretKey) as JwtPayload;
		} catch (e: unknown) {
			let message = (e as JsonWebTokenError).message.replace('jwt', 'token');
			message = message.charAt(0).toUpperCase() + message.slice(1);
			throw new AppError(message, 401);
		}
	}
}
