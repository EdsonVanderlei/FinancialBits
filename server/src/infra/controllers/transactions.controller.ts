import { Request, Response } from 'express';
import {
	CreateTransactionUseCaseInput,
	CreateTransactionUseCaseOutput,
} from '../../use-cases/transactions/create-transaction/create-transaction.use-case-io';
import {
	DeleteTransactionUseCaseInput,
	DeleteTransactionUseCaseOutput,
} from '../../use-cases/transactions/delete-transaction/delete-transaction.use-case-io';
import {
	LoadTransactionsUseCaseInput,
	LoadTransactionsUseCaseOutput,
} from '../../use-cases/transactions/load-transactions/load-transactions.use-case-io';
import {
	UpdateTransactionUseCaseInput,
	UpdateTransactionUseCaseOutput,
} from '../../use-cases/transactions/update-transaction/update-transaction.use-case-io';
import { UseCase } from '../../use-cases/use-case';
import { Controller } from '../decorators/controller.decorator';
import { Route } from '../decorators/route.decorator';
import { HttpMethodEnum } from '../enums/http-method.enum';

@Controller('/transactions')
export class TransactionsController {
	constructor(
		private loadTransactionsUseCase: UseCase<LoadTransactionsUseCaseInput, LoadTransactionsUseCaseOutput>,
		private createTransactionUseCase: UseCase<CreateTransactionUseCaseInput, CreateTransactionUseCaseOutput>,
		private updateTransactionUseCase: UseCase<UpdateTransactionUseCaseInput, UpdateTransactionUseCaseOutput>,
		private deleteTransactionUseCase: UseCase<DeleteTransactionUseCaseInput, DeleteTransactionUseCaseOutput>
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

	@Route(HttpMethodEnum.PUT, '/:id')
	public async update(req: Request, res: Response) {
		const { id } = req.query;
		const { date, value, description } = req.body;
		const transaction = await this.updateTransactionUseCase.exec({
			id: id?.toString() ?? '',
			date,
			value,
			description,
		});
		return res.status(200).json(transaction);
	}

	@Route(HttpMethodEnum.DELETE, '/:id')
	public async delete(req: Request, res: Response) {
		const { id } = req.query;
		await this.deleteTransactionUseCase.exec({
			id: id?.toString() ?? '',
		});
		return res.status(200).json();
	}
}
