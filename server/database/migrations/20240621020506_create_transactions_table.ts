import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('transactions', builder => {
		builder.uuid('id').primary().notNullable();
		builder.uuid('user_id').references('users.id');
		builder.bigInteger('date').notNullable();
		builder.float('value').notNullable();
		builder.string('description').notNullable();
		builder.bigInteger('created_at').notNullable();
		builder.bigInteger('updated_at').defaultTo(null);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('transactions');
}
