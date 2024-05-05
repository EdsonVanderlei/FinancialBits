import { DataObject } from '../../data-objects/data-object';
import { UUID } from '../../data-objects/uuid/uuid';
import { Entity } from '../../entities/entity';
import { Repository } from '../repository';

export abstract class InMemoryRepository<T extends Entity> implements Repository<T> {
	protected _values: T[] = [];

	protected _filterWhere = (where: Partial<T>) => (value: T) => {
		return Object.entries(where).every(entry => {
			const prop = value[entry[0] as keyof T];
			if (prop instanceof DataObject) {
				return prop.value === (entry[1] as any).value;
			}
			return prop === entry[1];
		});
	};

	async exists(where: Partial<T>) {
		return !!(await this.findOne(where));
	}

	async findAll(where?: Partial<T>) {
		return this._values.filter(where ? this._filterWhere(where) : () => true);
	}

	async findOne(where: Partial<T>) {
		const result = await this.findAll(where);

		if (!result || result.length < 1) {
			return null;
		}
		return result[0];
	}

	async create(value: Partial<T>) {
		this._values.push(value as T);
		return value as T;
	}

	async update(id: UUID, value: Partial<T>) {
		let savedValue = await this.findOne({ id } as Partial<T>);
		if (!savedValue) return null;
		this._values.splice(this._values.indexOf(savedValue), 1);
		this._values.push(value as T);
		return value as T;
	}

	async delete(where: Partial<T>) {
		const Sessions = await this.findAll(where);
		let deleteCount = 0;
		Sessions.forEach((_, index) => {
			this._values.splice(index, 1);
			deleteCount++;
		});
		return { deleteCount };
	}
}
