import { Session } from '../entities/session/session';
import { CreateSessionProps } from '../types/session/create-session-props';
import { LoadSessionProps } from '../types/session/load-session-props';
import { Repository } from './repository';

export interface SessionRepository extends Repository<Session> {
	exists(where: Partial<LoadSessionProps>): Promise<boolean>;
	findAll(where?: Partial<LoadSessionProps>): Promise<Session[]>;
	findOne(where: Partial<LoadSessionProps>): Promise<Session | null>;
	create(props: CreateSessionProps): Promise<Session>;
	update(props: LoadSessionProps): Promise<Session | null>;
	delete(where: Partial<LoadSessionProps>): Promise<{ deleteCount: number }>;
}
