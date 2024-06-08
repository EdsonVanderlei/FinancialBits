import { JWT } from '../../domain/data-objects/jwt/jwt';

export class SessionToken {
	accessToken: JWT;
	refreshToken: JWT;

	constructor(
		payload: { sub: string; name: string },
		secretKeys: { access: string; refresh: string },
		refreshToken?: JWT
	) {
		this.accessToken = JWT.create(payload, secretKeys.access, {
			expiresIn: '5m',
		});
		this.refreshToken = refreshToken ?? JWT.create(payload, secretKeys.refresh);
	}

	get asString() {
		return { access: this.accessToken.value, refresh: this.refreshToken.value };
	}
}
