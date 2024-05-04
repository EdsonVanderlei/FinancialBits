import { UUID } from '../../data-objects/uuid/uuid';

export type CreateTransactionProps = {
	value: number;
	date: number;
	userId: UUID;
};
