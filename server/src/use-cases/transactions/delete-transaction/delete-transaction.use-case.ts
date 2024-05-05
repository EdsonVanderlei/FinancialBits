import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { Repository } from '../../../domain/repositories/repository';
import { AppError } from '../../../shared/classes/app-error';
import { UseCase } from '../../use-case';
import { Transaction } from './../../../domain/entities/transaction/transaction';
import { DeleteTransactionUseCaseInput, DeleteTransactionUseCaseOutput } from './delete-transaction.use-case-io';

export class DeleteTransactionUseCase
	implements UseCase<DeleteTransactionUseCaseInput, DeleteTransactionUseCaseOutput>
{
	constructor(private transactionRepository: Repository<Transaction>) {}

	async exec(request: DeleteTransactionUseCaseInput): Promise<DeleteTransactionUseCaseOutput> {
		const id = new UUID(request.id);
		if (!(await this.transactionRepository.exists({ id }))) {
			throw new AppError("Transaction doesn't exist", 404);
		}
		return await this.transactionRepository.delete({ id });
	}
}
