import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { TransactionRepository } from '../../../domain/repositories/transaction/transaction.repository';
import { AppError } from '../../../shared/classes/app-error';
import { UseCase } from '../../use-case';
import {
	FindTransactionByIdUseCaseInput,
	FindTransactionByIdUseCaseOutput,
} from './find-transaction-by-id.use-case-io';

export class FindTransactionByIdUseCase
	implements UseCase<FindTransactionByIdUseCaseInput, FindTransactionByIdUseCaseOutput>
{
	constructor(private transactionRepository: TransactionRepository) {}

	async exec(input: FindTransactionByIdUseCaseInput) {
		const id = UUID.create(input.id);
		const userId = UUID.create(input.userId);

		let transaction = await this.transactionRepository.findById(userId, id);
		if (!transaction) {
			throw new AppError('Transaction not found', 404);
		}

		return transaction;
	}
}
