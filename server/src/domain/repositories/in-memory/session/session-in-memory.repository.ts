import { Session } from '../../../entities/session/session';
import { LoadSessionProps } from '../../../types/session/load-session-props';
import { InMemoryRepository } from '../in-memory.repository';

export class SessionInMemoryRepository extends InMemoryRepository<Session> {
	protected _filterWhere = (where: Partial<LoadSessionProps>) => (session: Session) =>
		Object.entries(where).every(entry => {
			const sessionProp = session[entry[0] as keyof Session];
			if (typeof sessionProp === 'object') {
				return sessionProp.value === (entry[1] as any).value;
			}
			return sessionProp === entry[1];
		});
}
