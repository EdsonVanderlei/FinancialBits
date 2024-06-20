import { Knex } from 'knex';
import { Timestamps } from '../../../../shared/domain/data-objects/timestamps/timestamps';
import { UUID } from '../../../../shared/domain/data-objects/uuid/uuid';
import { KnexRepository } from '../../../../shared/domain/knex.repository';
import { JWT } from '../../data-objects/jwt/jwt';
import { Session } from '../../entities/session/session';
import { SessionRepository } from './session.repository';

/* eslint-disable @typescript-eslint/no-explicit-any */

export class SessionKnexRepository extends KnexRepository implements SessionRepository {
	constructor(knex: Knex) {
		super(knex, 'sessions');
	}

	private queryToSession(query: any) {
		const result = query.length > 0 ? query[0] : null;
		if (query.length <= 0 || !result) return null;

		return Session.load({
			id: UUID.create(result.id),
			userId: UUID.create(result.user_id),
			refreshToken: JWT.create(result.refresh_token),
			timestamps: Timestamps.create({
				createdAt: new Date(result.created_at),
				updatedAt: new Date(result.updated_at),
			}),
		});
	}

	async create(session: Session) {
		const query = await this.knex(this.tableName)
			.insert({
				id: session.id.value,
				user_id: session.userId.value,
				refresh_token: session.refreshToken.value,
				created_at: session.timestamps.value.createdAt.getTime(),
				updated_at: session.timestamps.value.updatedAt ?? null,
			})
			.returning('*');
		return this.queryToSession(query);
	}

	async findByUserId(userId: UUID) {
		const query = await this.knex.select().where({ user_id: userId.value }).from(this.tableName);
		return this.queryToSession(query);
	}

	async deleteByUserId(userId: UUID) {
		await this.knex(this.tableName).where({ user_id: userId.value }).delete();
	}
}
