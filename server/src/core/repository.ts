import { Entity } from './entity';

export interface Repository<T extends Entity> {
	exists(where: Partial<T>): Promise<boolean>;
	findAll(where?: Partial<T>): Promise<T[]>;
	findOne(where: Partial<T>): Promise<T | null>;
	create(value: Omit<T, 'id'>): Promise<T>;
	update(value: T): Promise<T | null>;
	delete(where: Partial<T>): Promise<T | null>;
}
