import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { Transaction } from '../../../domain/entities/transaction/transaction';
import { TransactionRepository } from '../../../domain/repositories/transaction/transaction.repository';
import { UseCase } from '../../use-case';
import {
	CreateTransactionUseCaseInput,
	CreateTransactionUseCaseOutput,
} from './create-transaction.use-case-io';

export class CreateTransactionUseCase
	implements
		UseCase<CreateTransactionUseCaseInput, CreateTransactionUseCaseOutput>
{
	constructor(private transactionRepository: TransactionRepository) {}

	async exec(input: CreateTransactionUseCaseInput) {
		let transaction = Transaction.create({
			date: new Date(input.date),
			value: input.value,
			description: input.description,
			userId: new UUID(input.userId),
		});
		transaction.validateCreate();
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
