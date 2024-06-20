import { UUID } from '../../../shared/domain/data-objects/uuid/uuid';
import { Transaction } from '../entities/transaction';

export interface TransactionRepository {
	create(transaction: Transaction): Promise<Transaction>;
	update(transaction: Transaction): Promise<Transaction | null>;
	findById(id: UUID, userId: UUID): Promise<Transaction | null>;
	findByDateRange(from: Date, to: Date, userId: UUID): Promise<Transaction[]>;
	deleteById(id: UUID, userId: UUID): Promise<void>;
}
