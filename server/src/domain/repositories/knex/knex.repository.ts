import knex from 'knex';
import { Repository } from '../repository';
import { Entity } from '../../entities/entity';
import { DataObject } from '../../data-objects/data-object';
import { UUID } from '../../data-objects/uuid/uuid';
import { StringUtils } from '../../../shared/utils/string/string.utils';

export abstract class KnexRespository<T extends Entity> implements Repository<T> {
	protected _knex: knex.Knex;
	protected _tableName: string;

	constructor(knex: knex.Knex, tableName: string) {
		this._knex = knex;
		this._tableName = tableName;
	}

	protected abstract databaseToEntity(database: any): T;

	protected abstract entityToDatabase(entity: T): any;

	protected handleWhere(where: Partial<T>) {
		return Object.entries(where)
			.map(entry => {
				if (!(entry[1] instanceof DataObject)) {
					return entry;
				}
				return [entry[0], entry[1].value];
			})
			.reduce((acc, curr) => {
				acc[StringUtils.camelToSnake(curr[0])] = curr[1];
				return acc;
			}, {} as any);
	}

	public async exists(where: Partial<T>) {
		const res = await this._knex(this._tableName).where(this.handleWhere(where)).count();
		return (res[0]['count(*)'] as number) > 0;
	}

	public async findAll(where?: Partial<T> | undefined) {
		return (
			await this._knex(this._tableName)
				.where(where ? this.handleWhere(where) : {})
				.select('*')
		).map(this.databaseToEntity);
	}

	public async findOne(where: Partial<T>) {
		const result = await this._knex(this._tableName).where(this.handleWhere(where)).select('*');
		if (result.length < 1) return null;
		return this.databaseToEntity(result[0]);
	}

	public async create(value: T) {
		const result = (await this._knex(this._tableName)
			.returning('*')
			.insert(this.entityToDatabase(value))) as any[];
		return this.databaseToEntity(result[0]);
	}

	public async update(id: UUID, value: T) {
		const result = (await this._knex(this._tableName)
			.returning('*')
			.where({ id: id.value })
			.update(this.entityToDatabase(value))) as any;
		if (!result) return null;
		return this.databaseToEntity(result[0]);
	}

	public async delete(where: Partial<T>) {
		const result = await this._knex(this._tableName).where(this.handleWhere(where)).delete();
		return { deleteCount: result };
	}
}
