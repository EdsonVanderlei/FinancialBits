import { Transaction } from '../../../entities/transaction/transaction';
import { InMemoryRepository } from '../in-memory.repository';

export class TransactionInMemoryRepository extends InMemoryRepository<Transaction> {}
