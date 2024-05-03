import { Session } from '../../../entities/session/session';
import { CreateSessionProps } from '../../../types/session/create-session-props';
import { LoadSessionProps } from '../../../types/session/load-session-props';
import { SessionRepository } from '../../session-repository';

export class SessionInMemoryRepository implements SessionRepository {
	protected _sessions: Session[] = [];

	private filterWhere = (where: Partial<LoadSessionProps>) => (session: Session) =>
		Object.entries(where).every(entry => {
			const sessionProp = session[entry[0] as keyof Session];
			if (typeof sessionProp === 'object') {
				return sessionProp.value === (entry[1] as any).value;
			}
			return sessionProp === entry[1];
		});

	async exists(where: Partial<LoadSessionProps>) {
		return !!(await this.findOne(where));
	}

	async findAll(where?: Partial<LoadSessionProps>) {
		return this._sessions.filter(where ? this.filterWhere(where) : () => true);
	}

	async findOne(where: Partial<LoadSessionProps>) {
		const result = await this.findAll(where);

		if (!result || result.length < 1) {
			return null;
		}
		return result[0];
	}

	async create(props: CreateSessionProps) {
		const session = Session.create(props);
		this._sessions.push(session);
		return session;
	}

	async update(props: LoadSessionProps) {
		const session = await this.findOne({ id: props.id });
		if (!session) return null;

		this._sessions.splice(this._sessions.indexOf(session), 1);
		const newSession = Session.load(props);
		this._sessions.push(newSession);

		return newSession;
	}

	async delete(where: Partial<LoadSessionProps>) {
		const Sessions = await this.findAll(where);
		let deleteCount = 0;
		Sessions.forEach((_, index) => {
			this._sessions.splice(index, 1);
			deleteCount++;
		});
		return { deleteCount };
	}
}
