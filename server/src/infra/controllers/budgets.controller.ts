import { Request, Response } from 'express';
import { FindBudgetByDateRangeUseCaseInput, FindBudgetByDateRangeUseCaseOuput } from '../../use-cases/budget/find-by-date-range/find-budget-by-date-range.use-case-io';
import { UseCase } from '../../use-cases/use-case';
import { Controller } from '../decorators/controller.decorator';
import { Route } from '../decorators/route.decorator';
import { HttpMethodEnum } from '../types/route-definition';

@Controller('/budgets')
export class BudgetsController {
	constructor(
		private findBudgetByDateRangeUseCase: UseCase<FindBudgetByDateRangeUseCaseInput, FindBudgetByDateRangeUseCaseOuput>
	) { }

	@Route(HttpMethodEnum.GET, '/from/:startDate/to/:endDate')
	public async create(req: Request, res: Response) {
		const { startDate, endDate } = req.params;
		const { userId } = req.body;
		const busget = await this.findBudgetByDateRangeUseCase.exec({ startDate: +startDate, endDate: +endDate, userId });
		return res.status(200).json(busget);
	}
}
