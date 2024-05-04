import { JwtPayload, SignOptions, sign, verify, decode } from 'jsonwebtoken';
import { AppError } from '../../classes/app-error';

export abstract class JWTUtils {
	static regex(value: string | undefined | null) {
		const regExp = /(?:[\w-]*\.){2}[\w-]*/;
		return regExp.test(value ?? '');
	}

	static generate(payload: object, secretKey: string, options?: SignOptions) {
		try {
			return sign(payload, secretKey, options);
		} catch (e: any) {
			throw new AppError(e.message ?? 'Internal server error', 500);
		}
	}

	static verify(token: string, secretKey: string) {
		try {
			return verify(token, secretKey) as JwtPayload | null;
		} catch (e: any) {
			if (e.name === 'TokenExpiredError') {
				throw new AppError('Token expired', 401);
			} else {
				throw new AppError(e.message ?? 'Internal server error', 500);
			}
		}
	}

	static decode(token: string) {
		try {
			return decode(token) as JwtPayload | null;
		} catch (e: any) {
			throw new AppError(e.message ?? 'Internal server error', 500);
		}
	}
}
