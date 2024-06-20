import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('users', builder => {
		builder.uuid('id').primary().notNullable();
		builder.string('email').notNullable().unique();
		builder.text('password').notNullable();
		builder.string('first_name').notNullable();
		builder.string('last_name').defaultTo(null);
		builder.bigInteger('created_at').notNullable();
		builder.bigInteger('updated_at').defaultTo(null);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('users');
}