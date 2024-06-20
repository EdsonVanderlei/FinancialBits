import { AppError } from '../../../shared/classes/app-error';
import { UUID } from '../../../shared/domain/data-objects/uuid/uuid';
import { Validator } from '../../../shared/domain/validator';
import { UseCase } from '../../../shared/use-case';
import { Transaction } from '../../domain/entities/transaction';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { CreateTransactionUseCaseInput, CreateTransactionUseCaseOutput } from './create-transaction.use-case-io';

export class CreateTransactionUseCase
	implements UseCase<CreateTransactionUseCaseInput, CreateTransactionUseCaseOutput>
{
	constructor(
		private transactionRepository: TransactionRepository,
		private createTransactionValidator: Validator<Transaction>,
	) {}

	async exec(input: CreateTransactionUseCaseInput) {
		let userId: UUID;
		try {
			userId = UUID.create(input.userId);
		} catch (e) {
			throw new AppError('Invalid user identifier', 400);
		}

		let transaction = Transaction.create({
			date: new Date(input.date),
			value: input.value,
			description: input.description,
			userId,
		});
		transaction.validate(this.createTransactionValidator);
		transaction = await this.transactionRepository.create(transaction);

		return {
			id: transaction.id.value,
			date: transaction.date,
			value: transaction.value,
			description: transaction.description,
			userId: transaction.userId.value,
			...transaction.timestamps.value,
		};
	}
}
