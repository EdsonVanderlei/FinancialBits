import { JWT } from '../../data-objects/jwt/jwt';
import { UUID } from '../../data-objects/uuid/uuid';
import { Entity } from '../entity';
import { Timestamps } from './../../data-objects/timestamps/timestamps';

export class Session extends Entity {
	public userId!: UUID;
	public refreshToken!: JWT;
	public timestamps!: Timestamps;

	private constructor() {
		super();
	}

	static create(props: { userId: UUID; refreshToken: JWT }) {
		const session = new Session();
		session.id = UUID.generate();
		session.userId = props.userId;
		session.refreshToken = props.refreshToken;
		session.timestamps = Timestamps.generate();
		return session;
	}

	static load(props: { id: UUID; userId: UUID; refreshToken: JWT; timestamps: Timestamps }) {
		const session = new Session();
		session.id = props.id;
		session.userId = props.userId;
		session.refreshToken = props.refreshToken;
		session.timestamps = props.timestamps;
		return session;
	}
}
