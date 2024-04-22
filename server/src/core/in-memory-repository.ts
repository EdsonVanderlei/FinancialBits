import { Entity } from './entity';
import { Repository } from './repository';

export abstract class InMemoryRepository<T extends Entity> implements Repository<T> {
	protected _values: T[] = [];

	private filterWhere = (where: Partial<T>) => (value: T) =>
		Object.entries(where).every(entry => value[entry[0] as keyof T] === entry[1]);

	async exists(where: Partial<T>) {
		return !!(await this.findOne(where));
	}

	async findAll(where?: Partial<T>) {
		return this._values.filter(where ? this.filterWhere(where) : () => true);
	}

	async findOne(where: Partial<T>) {
		const result = (await this.findAll()).find(this.filterWhere(where));

		if (!result) {
			return null;
		}
		return result;
	}

	abstract create(value: Omit<T, 'id'>): Promise<T>;
	abstract update(value: T): Promise<T | null>;
	abstract delete(where: Partial<T>): Promise<T | null>;
}
