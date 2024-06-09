import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { Transaction } from '../../../domain/entities/transaction/transaction';
import { TransactionRepository } from '../../../domain/repositories/transaction/transaction.repository';
import { Validator } from '../../../domain/validator/validator';
import { UseCase } from '../../use-case';
import { CreateTransactionUseCaseInput, CreateTransactionUseCaseOutput } from './create-transaction.use-case-io';

export class CreateTransactionUseCase
	implements UseCase<CreateTransactionUseCaseInput, CreateTransactionUseCaseOutput>
{
	constructor(
		private transactionRepository: TransactionRepository,
		private createTransactionValidator: Validator<Transaction>
	) {}

	async exec(input: CreateTransactionUseCaseInput) {
		let transaction = Transaction.create({
			date: new Date(input.date),
			value: input.value,
			description: input.description,
			userId: UUID.create(input.userId),
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
