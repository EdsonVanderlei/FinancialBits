import { Request, Response } from 'express';
import { Controller } from '../../shared/decorators/controller.decorator';
import { Route } from '../../shared/decorators/route.decorator';
import { HttpMethodEnum } from '../../shared/types/http.method.enum';
import { UseCase } from '../../shared/use-case';
import {
	CreateTransactionUseCaseInput,
	CreateTransactionUseCaseOutput,
} from '../use-cases/create/create-transaction.use-case-io';
import {
	DeleteTransactionUseCaseInput,
	DeleteTransactionUseCaseOutput,
} from '../use-cases/delete/delete-transaction.use-case-io';
import {
	FindTransactionsByDateRangeUseCaseInput,
	FindTransactionsByDateRangeUseCaseOutput,
} from '../use-cases/find-by-date-range/find-transactions-by-date-range.use-case-io';
import {
	UpdateTransactionUseCaseInput,
	UpdateTransactionUseCaseOutput,
} from '../use-cases/update/update-transaction.use-case-io';

@Controller('/transactions')
export class TransactionsController {
	constructor(
		private findTransactionsByDateRangeUseCase: UseCase<FindTransactionsByDateRangeUseCaseInput,FindTransactionsByDateRangeUseCaseOutput>,
		private createTransactionUseCase: UseCase<CreateTransactionUseCaseInput, CreateTransactionUseCaseOutput>,
		private updateTransactionUseCase: UseCase<UpdateTransactionUseCaseInput, UpdateTransactionUseCaseOutput>,
		private deleteTransactionUseCase: UseCase<DeleteTransactionUseCaseInput, DeleteTransactionUseCaseOutput>,
	) {}

	@Route(HttpMethodEnum.GET, '/from/:startDate/to/:endDate')
	public async findByDateRange(req: Request, res: Response) {
		const { startDateQuery, endDateQuery } = req.query;
		const { userId } = req.body;
		const startDate = startDateQuery?.toString() ?? '';
		const endDate = endDateQuery?.toString() ?? '';
		const transaction = await this.findTransactionsByDateRangeUseCase.exec({ startDate, endDate, userId });
		return res.status(201).json(transaction);
	}

	@Route(HttpMethodEnum.POST, '/')
	public async create(req: Request, res: Response) {
		const { value, date, description, userId } = req.body;
		const transaction = await this.createTransactionUseCase.exec({ value, date, description, userId });
		return res.status(201).json(transaction);
	}

	@Route(HttpMethodEnum.POST, '/:id')
	public async update(req: Request, res: Response) {
		const id = (req.query.id ?? '').toString();
		const { value, date, description, userId } = req.body;
		const transaction = await this.updateTransactionUseCase.exec({ id, userId, date, value, description });
		return res.status(200).json(transaction);
	}

	@Route(HttpMethodEnum.DELETE, '/:id')
	public async delete(req: Request, res: Response) {
		const id = (req.query.id ?? '').toString();
		const { userId } = req.body;
		await this.deleteTransactionUseCase.exec({ id, userId });
		return res.status(200).json();
	}
}
