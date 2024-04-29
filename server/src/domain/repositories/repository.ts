import { Entity } from '../entities/entity';

export interface Repository<T extends Entity> {
	exists(...args: unknown[]): Promise<boolean>;
	findAll(...args: unknown[]): Promise<T[]>;
	findOne(...args: unknown[]): Promise<T | null>;
	create(...args: unknown[]): Promise<T>;
	update(...args: unknown[]): Promise<T | null>;
	delete(...args: unknown[]): Promise<{deleteCount: number}>;
}
