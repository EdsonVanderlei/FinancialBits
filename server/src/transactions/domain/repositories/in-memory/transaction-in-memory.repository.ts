import { UUID } from '../../../../shared/domain/data-objects/uuid/uuid';
import { Transaction } from '../../entities/transaction';
import { TransactionRepository } from '../transaction.repository';

export class TransactionInMemoryRepository implements TransactionRepository {
	private transactions: Transaction[] = [];

	async create(transaction: Transaction) {
		this.transactions.push(transaction);
		return transaction;
	}

	async update(transaction: Transaction) {
		const savedTransaction = await this.findById(transaction.id, transaction.userId);
		if (!savedTransaction) return null;
		await this.deleteById(savedTransaction.id, savedTransaction.userId);
		await this.create(transaction);
		return transaction;
	}

	async findById(id: UUID, userId: UUID) {
		return (
			this.transactions.find(
				transaction => transaction.id.value === id.value && transaction.userId.value === userId.value,
			) ?? null
		);
	}

	async findByDateRange(from: Date, to: Date, userId: UUID) {
		return this.transactions.filter(
			transaction =>
				transaction.userId.value === userId.value &&
				transaction.date.getTime() >= from.getTime() &&
				transaction.date.getTime() >= from.getTime(),
		);
	}

	async deleteById(id: UUID, userId: UUID) {
		this.transactions = this.transactions.filter(
			transaction => transaction.id.value !== id.value || transaction.userId.value !== userId.value,
		);
	}
}
