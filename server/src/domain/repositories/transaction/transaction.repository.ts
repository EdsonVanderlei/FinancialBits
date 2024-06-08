import { UUID } from '../../data-objects/uuid/uuid';
import { Transaction } from '../../entities/transaction/transaction';

export interface TransactionRepository {
	create(transaction: Transaction): Promise<Transaction>;
	update(transaction: Transaction): Promise<Transaction | null>;
	findById(userId: UUID, id: UUID): Promise<Transaction | null>;
	findByDateRange(userId: UUID, from: Date, to: Date): Promise<Transaction[]>;
	delete(id: UUID): Promise<void>;
}
