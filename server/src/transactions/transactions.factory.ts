import { Knex } from 'knex';
import { TransactionKnexRepository } from './domain/repositories/transaction-knex.repository';
import { TransactionValidator } from './domain/validator/transaction.validator';
import { TransactionsController } from './infra/transactions.controller';
import { CreateTransactionUseCase } from './use-cases/create/create-transaction.use-case';
import { DeleteTransactionUseCase } from './use-cases/delete/delete-transaction.use-case';
import { FindTransactionsByDateRangeUseCase } from './use-cases/find-by-date-range/find-transactions-by-date-range.use-case';
import { UpdateTransactionUseCase } from './use-cases/update/update-transaction.use-case';

export const transactionsFactory = (knexInstance?: Knex) => {
	const transactionRepository = new TransactionKnexRepository(knexInstance!);
	const transactionValidator = new TransactionValidator();

	const findTransactionsByDateRangeUseCase = new FindTransactionsByDateRangeUseCase(transactionRepository);
	const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository, transactionValidator);
	const updateTransactionUseCase = new UpdateTransactionUseCase(transactionRepository, transactionValidator);
	const deleteTransactionUseCase = new DeleteTransactionUseCase(transactionRepository);

	return new TransactionsController(
		findTransactionsByDateRangeUseCase,
		createTransactionUseCase,
		updateTransactionUseCase,
		deleteTransactionUseCase,
	);
};
