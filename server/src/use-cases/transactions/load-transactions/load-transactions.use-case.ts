import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { Transaction } from '../../../domain/entities/transaction/transaction';
import { Repository } from '../../../domain/repositories/repository';
import { UseCase } from '../../use-case';
import { LoadTransactionsUseCaseInput, LoadTransactionsUseCaseOutput } from './load-transactions.use-case-io';

export class LoadTransactionsUseCase implements UseCase<LoadTransactionsUseCaseInput, LoadTransactionsUseCaseOutput> {
	constructor(private transactionRepository: Repository<Transaction>) {}

	async exec(request: LoadTransactionsUseCaseInput): Promise<LoadTransactionsUseCaseOutput> {
		const where = request.userId ? { userId: new UUID(request.userId) } : undefined;
		return this.transactionRepository.findAll(where);
	}
}
