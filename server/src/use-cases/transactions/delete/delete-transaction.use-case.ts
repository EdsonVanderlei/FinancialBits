import { TransactionRepository } from '../../../domain/repositories/transaction/transaction.repository';
import { UseCase } from '../../use-case';
import { FindTransactionByIdUseCase } from '../find-by-id/find-transaction-by-id.use-case';
import { DeleteTransactionUseCaseInput, DeleteTransactionUseCaseOutput } from './delete-transaction.use-case-io';

export class DeleteTransactionUseCase
	implements UseCase<DeleteTransactionUseCaseInput, DeleteTransactionUseCaseOutput>
{
	constructor(
		private transactionRepository: TransactionRepository,
		private findTransactionByIdUseCase: FindTransactionByIdUseCase
	) {}

	async exec(input: DeleteTransactionUseCaseInput) {
		const transaction = await this.findTransactionByIdUseCase.exec({ id: input.id, userId: input.userId });
		await this.transactionRepository.deleteById(transaction.id, transaction.userId);
	}
}
