import { JWT } from '../domain/data-objects/jwt/jwt';
import { UUID } from '../../shared/domain/data-objects/uuid/uuid';

export class SessionToken {
	accessToken: JWT;
	refreshToken: JWT;

	constructor(
		payload: { userId: UUID; userFullName: string },
		secretKeys: { access: string; refresh: string },
		refreshToken?: JWT,
	) {
		this.accessToken = JWT.generate(payload, secretKeys.access, { expiresIn: '5m' });
		this.refreshToken = refreshToken ?? JWT.generate(payload, secretKeys.refresh);
	}

	get asString() {
		return { access: this.accessToken.value, refresh: this.refreshToken.value };
	}
}
