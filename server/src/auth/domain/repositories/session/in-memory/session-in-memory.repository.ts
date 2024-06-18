import { UUID } from '../../../../../shared/domain/data-objects/uuid/uuid';
import { Session } from '../../../entities/session/session';
import { SessionRepository } from '../session.repository';

export class SessionInMemoryRepository implements SessionRepository {
	private sessions: Session[] = [];

	async create(session: Session) {
		this.sessions.push(session);
		return session;
	}

	async findByUserId(userId: UUID): Promise<Session | null> {
		return this.sessions.find(session => session.userId.value === userId.value) ?? null;
	}

	async deleteByUserId(userId: UUID) {
		this.sessions = this.sessions.filter(session => session.userId.value !== userId.value);
	}
}
