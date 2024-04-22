import { JwtPayload, SignOptions, sign, verify } from 'jsonwebtoken';
import { ServerError } from '../../core/server-error';

export abstract class TokenUtils {
	static generate(payload: object, secretKey: string, options?: SignOptions) {
		try {
			return sign(payload, secretKey, options);
		} catch (e: any) {
			e.message = e.message && e.message.toString();
			e.message = e.message.includes('secretOrPrivateKey')
				? e.message.replace('secretOrPrivateKey', 'secretKey')
				: e.message;

			throw new ServerError(e.message ?? 'internal server error', 500);
		}
	}
	static decode(token: string, secretKey: string) {
		try {
			return verify(token, secretKey) as JwtPayload;
		} catch (e: any) {
			console.log(e);
			throw new ServerError(e.message ?? 'internal server error', 500);
		}
	}
}
