import { UUID } from '../../domain/data-objects/uuid/uuid';
import { Transaction } from '../../domain/entities/transaction/transaction';

export class Budget {
	public userID: UUID;
	public startDate: Date;
	public endDate: Date;
	public balance: number = 0;
	public totalIncome: number = 0;
	public totalOutcome: number = 0;
	public transactions: Transaction[] = [];

	constructor(
		userID: UUID,
		startDate: Date,
		endDate: Date,
		transactions: Transaction[]
	) {
		this.userID = userID;
		this.startDate = startDate;
		this.endDate = endDate;
		this.transactions = transactions;
		this.generateBalance();
	}

	public asString() {
		return {
			userId: this.userID.value,
			startDate: this.startDate.toISOString(),
			endDate: this.endDate.toISOString(),
			balance: this.balance,
			totalIncome: this.totalIncome,
			totalOutcome: this.totalOutcome,
			transactions: this.transactions,
		}
	}

	private generateBalance() {
		for (const transaction of this.transactions) {
			if (transaction.value > 0) this.totalIncome += transaction.value;
			else this.totalOutcome += transaction.value;
		}
		this.balance = this.totalIncome - this.totalOutcome;
	}
}
