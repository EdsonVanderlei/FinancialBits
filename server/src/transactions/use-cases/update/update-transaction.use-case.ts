import { AppError } from '../../../shared/classes/app-error';
import { Timestamps } from '../../../shared/domain/data-objects/timestamps/timestamps';
import { UUID } from '../../../shared/domain/data-objects/uuid/uuid';
import { Validator } from '../../../shared/domain/validator';
import { UseCase } from '../../../shared/use-case';
import { Transaction } from '../../domain/entities/transaction';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { UpdateTransactionUseCaseInput, UpdateTransactionUseCaseOutput } from './update-transaction.use-case-io';

export class UpdateTransactionUseCase
	implements UseCase<UpdateTransactionUseCaseInput, UpdateTransactionUseCaseOutput>
{
	constructor(
		private transactionRepository: TransactionRepository,
		private updateTransactionValidator: Validator<Transaction>,
	) {}

	async exec(input: UpdateTransactionUseCaseInput) {
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

		const newTransaction = Transaction.load({
			id: transaction.id,
			date: new Date(input.date),
			value: input.value,
			description: input.description,
			userId: transaction.userId,
			timestamps: Timestamps.create({ createdAt: transaction.timestamps.value.createdAt, updatedAt: new Date() }),
		});
		newTransaction.validate(this.updateTransactionValidator);

		const result = await this.transactionRepository.update(newTransaction);
		if (!result) {
			throw new AppError("Couldn't save the transaction", 500);
		}

		return {
			id: result.id.value,
			date: result.date,
			value: result.value,
			description: result.description,
			userId: result.userId.value,
			...result.timestamps.value,
		};
	}
}
