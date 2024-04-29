import { Entity } from '../../entities/entity';
import { Repository } from '../repository';

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

	async delete(where: Partial<T>) {
		const users = await this.findAll(where);
		let deleteCount = 0;
		users.forEach((_, index) => {
			this._values.splice(index, 1);
			deleteCount++;
		});
		return { deleteCount };
	}

	abstract create(...args: unknown[]): Promise<T>;
	abstract update(...args: unknown[]): Promise<T | null>;
}
