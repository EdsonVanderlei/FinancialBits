import { Timestamps } from '../../../domain/data-objects/timestamps/timestamps';
import { Transaction } from '../../../domain/entities/transaction/transaction';
import { TransactionRepository } from '../../../domain/repositories/transaction/transaction.repository';
import { UseCase } from '../../use-case';
import { FindTransactionByIdUseCase } from '../find-by-id/find-transaction-by-id.use-case';
import { UpdateTransactionUseCaseInput, UpdateTransactionUseCaseOutput } from './update-transaction.use-case-io';

export class UpdateTransactionUseCase
	implements UseCase<UpdateTransactionUseCaseInput, UpdateTransactionUseCaseOutput>
{
	constructor(
		private transactionRepository: TransactionRepository,
		private findTransactionByIdUseCase: FindTransactionByIdUseCase
	) {}

	async exec(input: UpdateTransactionUseCaseInput) {
		const transaction = await this.findTransactionByIdUseCase.exec({
			id: input.id,
			userId: input.userId,
		});

		let newTransaction: Transaction | null = Transaction.load({
			id: transaction.id,
			date: new Date(input.date),
			value: input.value,
			description: input.description,
			userId: transaction.userId,
			timestamps: Timestamps.create({ createdAt: transaction.timestamps.value.createdAt, updatedAt: new Date() }),
		});
		newTransaction = await this.transactionRepository.update(newTransaction);

		return {
			id: newTransaction!.id.value,
			date: newTransaction!.date,
			value: newTransaction!.value,
			description: newTransaction!.description,
			userId: newTransaction!.userId.value,
			...newTransaction!.timestamps.value,
		};
	}
}
