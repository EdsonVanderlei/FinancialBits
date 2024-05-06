import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('transactions', function (table) {
		table.uuid('id').notNullable().primary();
		table.timestamp('date').notNullable();
		table.float('value').notNullable();
		table.string('description').notNullable();
		table.string('user_id').notNullable().references('id').inTable('users')
		table.timestamps();
	});
}

export async function down(knex: Knex): Promise<void> {}
