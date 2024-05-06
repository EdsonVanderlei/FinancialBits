import { UUID } from '../../data-objects/uuid/uuid';
import { Entity } from '../entity';

export class Transaction extends Entity {
	public date!: number;
	public value!: number;
	public description!: string;
	public userId!: UUID;
	public createdAt!: number;
	public updatedAt?: number;

	private constructor() {
		super();
	}

	static create(props: { value: number; date: number; description: string; userId: UUID }) {
		const transaction = new Transaction();
		transaction.id = new UUID();
		transaction.date = props.date;
		transaction.value = props.value;
		transaction.description = props.description;
		transaction.userId = props.userId;
		return transaction;
	}

	static load(props: {
		id: UUID;
		date: number;
		value: number;
		description: string;
		userId: UUID;
		createdAt: number;
		updatedAt?: number;
	}) {
		const transaction = new Transaction();
		transaction.id = props.id;
		transaction.date = props.date;
		transaction.value = props.value;
		transaction.description = props.description;
		transaction.userId = props.userId;
		transaction.createdAt = props.createdAt;
		transaction.updatedAt = props.updatedAt;
		return transaction;
	}
}
