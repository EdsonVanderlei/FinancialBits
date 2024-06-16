import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { TransactionRepository } from '../../../domain/repositories/transaction/transaction.repository';
import { AppError } from '../../../shared/classes/app-error';
import { UseCase } from '../../use-case';
import { DeleteTransactionUseCaseInput, DeleteTransactionUseCaseOutput } from './delete-transaction.use-case-io';

export class DeleteTransactionUseCase
	implements UseCase<DeleteTransactionUseCaseInput, DeleteTransactionUseCaseOutput>
{
	constructor(private transactionRepository: TransactionRepository) {}

	async exec(input: DeleteTransactionUseCaseInput) {
		let id: UUID;
		let userId: UUID;

		try {
			id = UUID.create(input.id);
		} catch (e) {
			throw new AppError('Invalid transaction identifier', 400);
		}

		try {
			userId = UUID.create(input.userId);
		} catch (e) {
			throw new AppError('Invalid user identifier', 400);
		}

		const transaction = await this.transactionRepository.findById(id, userId);
		if (!transaction) {
			throw new AppError('Transaction not found', 404);
		}

		await this.transactionRepository.deleteById(transaction.id, transaction.userId);
	}
}
