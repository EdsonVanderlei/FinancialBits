import { Knex } from 'knex';
import { Timestamps } from '../../../shared/domain/data-objects/timestamps/timestamps';
import { UUID } from '../../../shared/domain/data-objects/uuid/uuid';
import { KnexRepository } from '../../../shared/domain/knex.repository';
import { Transaction } from '../entities/transaction';
import { TransactionRepository } from './transaction.repository';

/* eslint-disable @typescript-eslint/no-explicit-any */

export class TransactionKnexRepository extends KnexRepository implements TransactionRepository {
	constructor(knex: Knex) {
		super(knex, 'transactions');
	}

	private recordToTransaction(record: any) {
		if (!record) return null;

		return Transaction.load({
			id: UUID.create(record.id),
			userId: UUID.create(record.user_id),
			date: new Date(record.date),
			value: record.value,
			description: record.description,
			timestamps: Timestamps.create({
				createdAt: new Date(record.created_at),
				updatedAt: record.updated_at ? new Date(record.updated_at) : undefined,
			}),
		});
	}

	private queryToTransactions(query: any[]) {
		if (query?.length <= 0) return [];
		return query.filter(record => !!record).map(record => this.recordToTransaction(record)!);
	}

	private queryToTransaction(query: any[]) {
		if (query?.length <= 0) return null;
		return this.recordToTransaction(query[0]);
	}

	async create(transaction: Transaction) {
		await this.knex(this.tableName).insert({
			id: transaction.id.value,
			user_id: transaction.userId.value,
			date: transaction.date.getTime(),
			value: transaction.value,
			description: transaction.description,
			created_at: transaction.timestamps.value.createdAt?.getTime(),
			updated_at: transaction.timestamps.value.updatedAt?.getTime() ?? null,
		});
		const query = await this.findById(transaction.id, transaction.userId);
		return query;
	}

	async update(transaction: Transaction) {
		await this.knex(this.tableName).where({ id: transaction.id.value, user_id: transaction.userId.value }).update({
			date: transaction.date.getTime(),
			value: transaction.value,
			description: transaction.description,
			updated_at: transaction.timestamps.value.updatedAt?.getTime(),
		});
		const query = await this.findById(transaction.id, transaction.userId);
		return query;
	}

	async findById(id: UUID, userId: UUID) {
		const query = await this.knex.select().where({ id: id.value, user_id: userId.value }).from(this.tableName);
		return this.queryToTransaction(query);
	}

	async findByDateRange(from: Date, to: Date, userId: UUID) {
		const query = await this.knex
			.select()
			.where('date', '>=', from.getTime())
			.andWhere('date', '<=', to.getTime())
			.andWhere({ user_id: userId.value })
			.from(this.tableName);
		return this.queryToTransactions(query);
	}

	async deleteById(id: UUID, userId: UUID) {
		await this.knex(this.tableName).where({ id: id.value, user_id: userId.value }).delete();
	}
}
