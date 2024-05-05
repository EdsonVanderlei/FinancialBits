import { Session } from '../../../entities/session/session';
import { InMemoryRepository } from '../in-memory.repository';

export class SessionInMemoryRepository extends InMemoryRepository<Session> {}
