import { UUID } from '../../data-objects/uuid/uuid';

export type LoadTransactionProps = {
	id: UUID;
	value: number;
	date: number;
	userId: UUID;
	createdAt: number;
	updatedAt?: number;
};
