import { Timestamps } from './../../data-objects/timestamps/timestamps';
import { Transaction } from './../transaction/transaction';
import { UUID } from '../../data-objects/uuid/uuid';
import { Entity } from '../entity';
import { DateRange } from '../../data-objects/date-range/date-range';

export class MonthlyBudget extends Entity {
	userId!: UUID;
	dateRange!: DateRange;
	currentBalance!: number;
	initialBalance!: number;
	transactions!: Transaction[];
	timestamps!: Timestamps;

	private constructor() {
		super();
	}

	static create(props: { userId: UUID; month: number; year: number; initialBalance?: number }) {
		const monthlyBudget = new MonthlyBudget();
		monthlyBudget.id = new UUID();
		monthlyBudget.userId = props.userId;

		const startDate = new Date(props.year, props.month, 1, 0, 0, 0, 0);
		const endDate = new Date(props.year, props.month + 1, 0, 0, 0, 0, 0);
		monthlyBudget.dateRange = new DateRange(startDate.getTime(), endDate.getTime());

		monthlyBudget.initialBalance = props.initialBalance ?? 0;
		monthlyBudget.currentBalance = props.initialBalance ?? 0;
		monthlyBudget.transactions = [];
		return monthlyBudget;
	}

	static load(props: {
		id: UUID;
		userId: UUID;
		dateRange: DateRange;
		currentBalance: number;
		initialBalance: number;
		timestamps: Timestamps;
		transactions?: Transaction[];
	}) {
		const monthlyBudget = new MonthlyBudget();
		monthlyBudget.id = props.id;
		monthlyBudget.userId = props.userId;
		monthlyBudget.dateRange = props.dateRange;
		monthlyBudget.currentBalance = props.currentBalance;
		monthlyBudget.initialBalance = props.initialBalance;
		monthlyBudget.timestamps = props.timestamps;
		monthlyBudget.transactions = props.transactions ?? [];
		return monthlyBudget;
	}
}
