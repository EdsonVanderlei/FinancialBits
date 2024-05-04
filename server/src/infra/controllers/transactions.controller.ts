import { Request, Response } from 'express';
import { TransactionRepository } from '../../domain/repositories/transaction-repository';
import { UserRepository } from '../../domain/repositories/user-repository';
import { CreateTransactionUseCase } from '../../use-cases/transactions/create-transaction/create-transaction.use-case';
import { LoadTransactionsUseCase } from '../../use-cases/transactions/load-transactions/load-transactions.use-case';
import { Controller } from '../decorators/controller.decorator';
import { Route } from '../decorators/route.decorator';
import { HttpMethodEnum } from '../enums/http-method.enum';
import {
	CreateTransactionUseCaseInput,
	CreateTransactionUseCaseOutput,
} from '../../use-cases/transactions/create-transaction/create-transaction.use-case-io';
import {
	LoadTransactionsUseCaseInput,
	LoadTransactionsUseCaseOutput,
} from '../../use-cases/transactions/load-transactions/load-transactions.use-case-io';
import { UseCase } from '../../use-cases/use-case';

@Controller('/transactions')
export class TransactionsController {
	constructor(
		private loadTransactionsUseCase: UseCase<LoadTransactionsUseCaseInput, LoadTransactionsUseCaseOutput>,
		private createTransactionUseCase: UseCase<CreateTransactionUseCaseInput, CreateTransactionUseCaseOutput>
	) {}

	@Route(HttpMethodEnum.GET, '/')
	public async load(req: Request, res: Response) {
		const { userId } = req.body;
		const result = await this.loadTransactionsUseCase.exec({ userId });
		return res.status(200).json(result);
	}

	@Route(HttpMethodEnum.POST, '/')
	public async create(req: Request, res: Response) {
		const { value, date, description, userId } = req.body;
		const transaction = await this.createTransactionUseCase.exec({ value, date, description, userId });
		return res.status(201).json(transaction);
	}
}
