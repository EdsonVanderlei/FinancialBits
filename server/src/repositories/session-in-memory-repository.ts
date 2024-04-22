import { InMemoryRepository } from '../core/in-memory-repository';
import { Session } from '../entities/session';
import { UuidUtils } from '../utils/uuid/uuid.utils';

export class SessionInMemoryRepository extends InMemoryRepository<Session> {
	async create(value: Omit<Session, 'id'>) {
		const session = new Session(UuidUtils.generate(), value.userId, value.refreshToken);
		this._values.push(session);

		return session;
	}

	async update(value: Session) {
		const session = await this.findOne({ id: value.id });
		if (!session) {
			return null;
		}

		this._values.splice(this._values.indexOf(session), 1);
		const newSession = new Session(value.id, value.userId, value.refreshToken);
		this._values.push(newSession);

		return newSession;
	}

	async delete(where: Partial<Session>) {
		const session = await this.findOne(where);
		if (!session) {
			return null;
		}

		this._values.splice(this._values.indexOf(session), 1);
		return session;
	}
}
