import { UUID } from '../../../../shared/domain/data-objects/uuid/uuid';
import { Session } from '../../entities/session/session';

export interface SessionRepository {
	create(session: Session): Promise<Session>;
	findByUserId(userId: UUID): Promise<Session | null>;
	deleteByUserId(userId: UUID): Promise<void>;
}
