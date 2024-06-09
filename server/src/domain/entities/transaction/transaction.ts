import { UUID } from '../../data-objects/uuid/uuid';
import { CreateTransactionValidator } from '../../validator/transaction/create-transaction.validator';
import { Entity } from '../entity';
import { Timestamps } from './../../data-objects/timestamps/timestamps';

export class Transaction extends Entity {
	public date!: Date;
	public value!: number;
	public description!: string;
	public userId!: UUID;
	public timestamps!: Timestamps;

	private constructor() {
		super();
	}

	static create(props: { date: Date; value: number; description: string; userId: UUID }) {
		const transaction = new Transaction();
		transaction.id = UUID.generate();
		transaction.date = props.date;
		transaction.value = props.value;
		transaction.description = props.description;
		transaction.userId = props.userId;
		transaction.timestamps = Timestamps.generate();
		return transaction;
	}

	static load(props: {
		id: UUID;
		date: Date;
		value: number;
		description: string;
		userId: UUID;
		timestamps: Timestamps;
	}) {
		const transaction = new Transaction();
		transaction.id = props.id;
		transaction.date = props.date;
		transaction.value = props.value;
		transaction.description = props.description;
		transaction.userId = props.userId;
		transaction.timestamps = props.timestamps;
		return transaction;
	}

	public validateCreate() {
		const validator = new CreateTransactionValidator();
		this.validate(validator);
	}
}
