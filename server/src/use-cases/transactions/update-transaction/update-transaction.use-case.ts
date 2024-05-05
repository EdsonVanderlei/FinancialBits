import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { User } from '../../../domain/entities/user/user';
import { Repository } from '../../../domain/repositories/repository';
import { AppError } from '../../../shared/classes/app-error';
import { UseCase } from '../../use-case';
import { Transaction } from './../../../domain/entities/transaction/transaction';
import { UpdateTransactionUseCaseInput, UpdateTransactionUseCaseOutput } from './update-transaction.use-case-io';

export class UpdateTransactionUseCase
	implements UseCase<UpdateTransactionUseCaseInput, UpdateTransactionUseCaseOutput>
{
	constructor(private transactionRepository: Repository<Transaction>) {}

	async exec(request: UpdateTransactionUseCaseInput): Promise<UpdateTransactionUseCaseOutput> {
		if (request.value === 0) {
			throw new AppError('Transaction value must be different from 0', 400);
		}

		if (request.date <= 0) {
			throw new AppError('Transaction date is invalid', 400);
		}

		if (!request.description) {
			throw new AppError('Transaction description is required', 400);
		}

		let transaction = await this.transactionRepository.findOne({ id: new UUID(request.id) });

		if (!transaction) {
			throw new AppError("Transaction doesn't exist", 404);
		}

		const newTransaction = await this.transactionRepository.update(
			transaction.id!,
			Transaction.load({
				id: transaction.id!,
				value: request.value,
				date: request.date,
				description: request.description,
				userId: transaction.userId,
				createdAt: transaction.createdAt,
				updatedAt: new Date().getTime(),
			})
		);

		if (!newTransaction) {
			throw new AppError("Couldn't save the transaction", 500);
		}

		return {
			id: newTransaction.id!.value,
			date: newTransaction?.date,
			value: newTransaction.value,
			userId: newTransaction.userId.value,
			description: newTransaction.description,
			createdAt: newTransaction.createdAt,
			updatedAt: newTransaction.updatedAt!,
		};
	}
}
