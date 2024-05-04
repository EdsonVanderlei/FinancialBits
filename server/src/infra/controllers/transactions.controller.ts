import { Request, Response } from 'express';
import { TransactionRepository } from '../../domain/repositories/transaction-repository';
import { UserRepository } from '../../domain/repositories/user-repository';
import { CreateTransactionUseCase } from '../../use-cases/transactions/create-transaction/create-transaction.use-case';
import { LoadTransactionsUseCase } from '../../use-cases/transactions/load-transactions/load-transactions.use-case';
import { Controller } from '../decorators/controller.decorator';
import { Route } from '../decorators/route.decorator';
import { HttpMethodEnum } from '../enums/http-method.enum';

@Controller('/transactions')
export class TransactionsController {
	private loadTransactionsUseCase: LoadTransactionsUseCase;
	private createTransactionUseCase: CreateTransactionUseCase;

	constructor(userRepository: UserRepository, transactionRepository: TransactionRepository) {
		this.loadTransactionsUseCase = new LoadTransactionsUseCase(transactionRepository);
		this.createTransactionUseCase = new CreateTransactionUseCase(userRepository, transactionRepository);
	}

	@Route(HttpMethodEnum.GET, '/')
	public async load(req: Request, res: Response) {
		const { userId } = req.body;
		const result = await this.loadTransactionsUseCase.exec({ userId });
		return res.status(200).json(result);
	}

	@Route(HttpMethodEnum.POST, '/')
	public async create(req: Request, res: Response) {
		const { value, date, userId } = req.body;
		const transaction = await this.createTransactionUseCase.exec({ value, date, userId });
		return res.status(201).json(transaction);
	}
}
