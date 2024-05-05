import { UUID } from './../data-objects/uuid/uuid';
import { Entity } from '../entities/entity';

export interface Repository<T extends Entity> {
	exists(where: Partial<T>): Promise<boolean>;
	findAll(where?: Partial<T>): Promise<T[]>;
	findOne(where: Partial<T>): Promise<T | null>;
	create(value: Partial<T>): Promise<T>;
	update(id: UUID, value: Partial<T>): Promise<T | null>;
	delete(where: Partial<T>): Promise<{ deleteCount: number }>;
}
