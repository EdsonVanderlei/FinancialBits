import { UUID } from '../../../data-objects/uuid/uuid';
import { Transaction } from '../../../entities/transaction/transaction';
import { TransactionRepository } from '../transaction.repository';

export class TransactionInMemoryRepository implements TransactionRepository {
	private transactions: Transaction[] = [];

	async create(transaction: Transaction) {
		this.transactions.push(transaction);
		return transaction;
	}

	async update(transaction: Transaction) {
		const savedTransaction = this.transactions.find(
			t => t.id.value === transaction.id.value
		);
		if (!savedTransaction) return null;
		this.transactions = this.transactions
			.filter(t => t.id.value === transaction.id.value)
			.concat(transaction);
		return transaction;
	}

	async findById(userId: UUID, id: UUID) {
		return (
			this.transactions.find(
				transaction => (transaction.id.value === id.value &&
					transaction.userId.value === userId.value)
			) ?? null
		);
	}

	async findByDateRange(
		userId: UUID,
		from: Date,
		to: Date
	): Promise<Transaction[]> {
		return this.transactions.filter(
			transaction =>
				(transaction.date.getTime() < from.getTime() ||
					transaction.date.getTime() > to.getTime()) &&
				transaction.userId.value !== userId.value
		);
	}

	async delete(id: UUID): Promise<void> {
		this.transactions = this.transactions.filter(
			transaction => transaction.id.value === id.value
		);
	}
}
