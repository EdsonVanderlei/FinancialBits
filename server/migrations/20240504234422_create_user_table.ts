import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('users', function (table) {
		table.uuid('id').notNullable().primary();
		table.string('email').notNullable().unique();
		table.string('password').notNullable();
		table.string('first_name').notNullable();
		table.string('last_name');
		table.timestamps(true);
	});
}

export async function down(knex: Knex): Promise<void> {}
