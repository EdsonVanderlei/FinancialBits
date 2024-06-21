import { Knex } from 'knex';
import { Timestamps } from '../../../shared/domain/data-objects/timestamps/timestamps';
import { UUID } from '../../../shared/domain/data-objects/uuid/uuid';
import { KnexRepository } from '../../../shared/domain/knex.repository';
import { Email } from '../data-objects/email/email';
import { Password } from '../data-objects/password/password';
import { User } from '../entities/user';
import { UserRepository } from './user.repository';

/* eslint-disable @typescript-eslint/no-explicit-any */

export class UserKnexRepository extends KnexRepository implements UserRepository {
	constructor(knex: Knex) {
		super(knex, 'users');
	}

	private queryToUser(query: any) {
		const result = query.length > 0 ? query[0] : null;
		if (query.length <= 0 || !result) return null;

		return User.load({
			id: UUID.create(result.id),
			email: Email.create(result.email),
			password: Password.load(result.password),
			firstName: result.first_name,
			lastName: result.last_name ?? undefined,
			timestamps: Timestamps.create({
				createdAt: new Date(result.created_at),
				updatedAt: result.updated_at ? new Date(result.updated_at) : undefined,
			}),
		});
	}

	async create(user: User) {
		await this.knex(this.tableName).insert({
			id: user.id.value,
			email: user.email.value,
			password: user.password.value,
			first_name: user.firstName,
			last_name: user.lastName ?? null,
			created_at: user.timestamps.value.createdAt?.getTime(),
			updated_at: user.timestamps.value.updatedAt?.getTime() ?? null,
		});
		return await this.findById(user.id);
	}

	async findByEmail(email: Email) {
		const query = await this.knex.select().where({ email: email.value }).from(this.tableName);
		return this.queryToUser(query);
	}

	async findById(id: UUID) {
		const query = await this.knex.select().where({ id: id.value }).from(this.tableName);
		return this.queryToUser(query);
	}
}
