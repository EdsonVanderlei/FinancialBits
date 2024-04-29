import { JWT } from '../../data-objects/jwt/jwt';
import { UUID } from '../../data-objects/uuid/uuid';
import { Entity } from '../entity';

export class Session extends Entity {
	public userId!: UUID;
	public refreshToken!: JWT;

	private constructor() {
		super();
	}

	static create(userId: string, refreshToken: string) {
		const session = new Session();
		session.id = new UUID();
		session.userId = new UUID(userId);
		session.refreshToken = new JWT(refreshToken);
		return session;
	}

	static restore(id: UUID, userId: UUID, refreshToken: JWT) {
		const session = new Session();
		session.id = id;
		session.userId = userId;
		session.refreshToken = refreshToken;
		return session;
	}
}
