import { JWT } from '../../data-objects/jwt/jwt';
import { UUID } from '../../data-objects/uuid/uuid';
import { Entity } from '../entity';

export class Session extends Entity {
	public userId!: UUID;
	public refreshToken!: JWT;
	public createdAt!: number;
	public updatedAt?: number;

	private constructor() {
		super();
	}

	static create(props: { userId: UUID; refreshToken: JWT }) {
		const session = new Session();
		session.id = new UUID();
		session.userId = props.userId;
		session.refreshToken = props.refreshToken;
		return session;
	}

	static load(props: { id: UUID; userId: UUID; refreshToken: JWT; createdAt: number; updatedAt?: number }) {
		const session = new Session();
		session.id = props.id;
		session.userId = props.userId;
		session.refreshToken = props.refreshToken;
		session.createdAt = props.createdAt;
		session.updatedAt = props.updatedAt;
		return session;
	}
}
