import { Timestamps } from '../../../../shared/domain/data-objects/timestamps/timestamps';
import { UUID } from '../../../../shared/domain/data-objects/uuid/uuid';
import { Entity } from '../../../../shared/domain/entity';
import { JWT } from '../../data-objects/jwt/jwt';

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
