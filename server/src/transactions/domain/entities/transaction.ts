import { Timestamps } from '../../../shared/domain/data-objects/timestamps/timestamps';
import { UUID } from '../../../shared/domain/data-objects/uuid/uuid';
import { Entity } from '../../../shared/domain/entity';

export class Transaction extends Entity {
	public userId!: UUID;
	public date!: Date;
	public value!: number;
	public description!: string;
	public timestamps!: Timestamps;

	private constructor() {
		super();
	}

	static create(props: { userId: UUID; date: Date; value: number; description: string }) {
		const transaction = new Transaction();
		transaction.id = UUID.generate();
		transaction.userId = props.userId;
		transaction.date = props.date;
		transaction.value = props.value;
		transaction.description = props.description;
		transaction.timestamps = Timestamps.generate();
		return transaction;
	}

	static load(props: {
		id: UUID;
		userId: UUID;
		date: Date;
		value: number;
		description: string;
		timestamps: Timestamps;
	}) {
		const transaction = new Transaction();
		transaction.id = props.id;
		transaction.userId = props.userId;
		transaction.date = props.date;
		transaction.value = props.value;
		transaction.description = props.description;
		transaction.timestamps = props.timestamps;
		return transaction;
	}
}
