import { JWT } from '../../data-objects/jwt/jwt';
import { UUID } from '../../data-objects/uuid/uuid';
import { CreateSessionProps } from '../../types/session/create-session-props';
import { LoadSessionProps } from '../../types/session/load-session-props';
import { Entity } from '../entity';

export class Session extends Entity {
	public userId!: UUID;
	public refreshToken!: JWT;

	private constructor() {
		super();
	}

	static create(props: CreateSessionProps) {
		const session = new Session();
		session.id = new UUID();
		session.userId = props.userId;
		session.refreshToken = props.refreshToken;
		return session;
	}

	static load(props: LoadSessionProps) {
		const session = new Session();
		session.id = props.id;
		session.userId = props.userId;
		session.refreshToken = props.refreshToken;
		return session;
	}
}
