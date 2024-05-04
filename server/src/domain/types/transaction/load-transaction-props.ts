import { UUID } from '../../data-objects/uuid/uuid';

export type LoadTransactionProps = {
	id: UUID;
	value: number;
	date: number;
	description: string;
	userId: UUID;
	createdAt: number;
	updatedAt?: number;
};
