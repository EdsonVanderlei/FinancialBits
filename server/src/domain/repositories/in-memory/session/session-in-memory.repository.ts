import { UuidUtils } from '../../../../shared/utils/uuid/uuid.utils';
import { Session } from '../../../entities/session/session';
import { InMemoryRepository } from '../in-memory.repository';

export class SessionInMemoryRepository extends InMemoryRepository<Session> {
	async create(value: Omit<Session, 'id'>) {
		const session = Session.create(value.userId.value, value.refreshToken.value);
		this._values.push(session);

		return session;
	}

	async update(value: Session) {
		const session = await this.findOne({ id: value.id });
		if (!session) return null;

		this._values.splice(this._values.indexOf(session), 1);
		const newSession = Session.restore(value.id!, value.userId, value.refreshToken);
		this._values.push(newSession);

		return newSession;
	}
}
