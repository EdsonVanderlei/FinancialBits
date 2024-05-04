import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { UserRepository } from '../../../domain/repositories/user-repository';
import { AppError } from '../../../shared/classes/app-error';
import { Transaction } from './../../../domain/entities/transaction/transaction';
import { TransactionRepository } from './../../../domain/repositories/transaction-repository';
import { CreateTransactionUseCaseInput, CreateTransactionUseCaseOutput } from './create-transaction.use-case-io';

export class CreateTransactionUseCase {
	constructor(private userRepository: UserRepository, private transactionRepository: TransactionRepository) {}

	async exec(request: CreateTransactionUseCaseInput): Promise<CreateTransactionUseCaseOutput> {
		if (request.value === 0) {
			throw new AppError('Transaction value must be different from 0', 400);
		}

		if (request.date <= 0) {
			throw new AppError('Transaction date is invalid', 400);
		}

		if (!request.description) {
			throw new AppError('Transaction description is required', 400);
		}

		let transaction = Transaction.create({
			date: request.date,
			value: request.value,
			description: request.description,
			userId: new UUID(request.userId),
		});
		
		if (!(await this.userRepository.exists({ id: transaction.userId }))) {
			throw new AppError("The user doesn't exist", 404);
		}
		
		transaction = await this.transactionRepository.create(transaction);
		
		return {
			date: transaction.date,
			value: transaction.value,
			description: transaction.description,
			userId: transaction.userId.value,
			createdAt: transaction.createdAt,
		};
	}
}
