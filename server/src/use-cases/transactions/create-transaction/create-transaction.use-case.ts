import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { User } from '../../../domain/entities/user/user';
import { Repository } from '../../../domain/repositories/repository';
import { AppError } from '../../../shared/classes/app-error';
import { UseCase } from '../../use-case';
import { Transaction } from './../../../domain/entities/transaction/transaction';
import { CreateTransactionUseCaseInput, CreateTransactionUseCaseOutput } from './create-transaction.use-case-io';

export class CreateTransactionUseCase
	implements UseCase<CreateTransactionUseCaseInput, CreateTransactionUseCaseOutput>
{
	constructor(private userRepository: Repository<User>, private transactionRepository: Repository<Transaction>) {}

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

		if (!transaction) {
			throw new AppError("Couldn't save the transaction", 500);
		}

		return {
			id: transaction.id!.value,
			date: transaction.date,
			value: transaction.value,
			description: transaction.description,
			userId: transaction.userId.value,
			createdAt: transaction.createdAt,
		};
	}
}
