import { UUID } from '../../data-objects/uuid/uuid';
import { CreateTransactionProps } from '../../types/transaction/create-transaction-props';
import { LoadTransactionProps } from '../../types/transaction/load-transaction-props';
import { Entity } from '../entity';

export class Transaction extends Entity {
	public value!: number;
	public date!: number;
	public description!: string;
	public userId!: UUID;
	public createdAt!: number;
	public updatedAt?: number;

	private constructor() {
		super();
	}

	static create(props: CreateTransactionProps) {
		const transaction = new Transaction();
		transaction.id = new UUID();
		transaction.value = props.value;
		transaction.date = props.date;
		transaction.description = props.description;
		transaction.userId = props.userId;
		transaction.createdAt = new Date().getTime();
		return transaction;
	}

	static load(props: LoadTransactionProps) {
		const transaction = new Transaction();
		transaction.id = props.id;
		transaction.value = props.value;
		transaction.date = props.date;
		transaction.description = props.description;
		transaction.userId = props.userId;
		transaction.createdAt = props.createdAt;
		transaction.updatedAt = props.updatedAt;
		return transaction;
	}
}
