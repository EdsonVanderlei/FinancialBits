import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('sessions', builder => {
		builder.uuid('id').primary().notNullable();
		builder.uuid('user_id').references('id').inTable('users').notNullable();
		builder.string('refresh_token').notNullable();
		builder.bigInteger('created_at').notNullable();
		builder.bigInteger('updated_at').defaultTo(null);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('sessions');
}
