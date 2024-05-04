import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { TransactionRepository } from '../../../domain/repositories/transaction-repository';
import { LoadTransactionsUseCaseInput, LoadTransactionsUseCaseOutput } from './load-transactions.use-case-io';

export class LoadTransactionsUseCase {
	constructor(private transactionRepository: TransactionRepository) {}

	async exec(request: LoadTransactionsUseCaseInput): Promise<LoadTransactionsUseCaseOutput> {
		const where = request.userId ? { userId: new UUID(request.userId) } : undefined;
		return this.transactionRepository.findAll(where);
	}
}
