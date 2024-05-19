import { DateRange } from '../../data-objects/date-range/date-range';
import { Timestamps } from '../../data-objects/timestamps/timestamps';
import { UUID } from '../../data-objects/uuid/uuid';
import { MonthlyBudget } from './monthly-budget';

describe('MonthlyBudget', () => {
	const input = {
		id: '315cd39b-b885-49af-87a4-e86e1a23b685',
		userId: '6d9bd0dd-b04d-4cf4-80d6-fb36528f7cd8',
		startDate: 1714532400000,
		endDate: 1717124400000,
		currentBalance: 100,
		initialBalance: 50,
		createdAt: 0,
	};

	test('create', () => {
		const inputDate = new Date(input.startDate);
		console.log(inputDate);
		console.log(inputDate.getUTCMonth(), inputDate.getUTCFullYear());

		const budget = MonthlyBudget.create({
			userId: new UUID(input.userId),
			month: inputDate.getUTCMonth(),
			year: inputDate.getFullYear(),
			initialBalance: input.initialBalance,
		});

		expect(budget.userId.value).toEqual(input.userId);
		expect(budget.dateRange.value.start).toEqual(inputDate.getTime());
		expect(budget.initialBalance).toEqual(input.initialBalance);
	});
	test('load', () => {
		const budget = MonthlyBudget.load({
			id: new UUID(input.id),
			userId: new UUID(input.userId),
			dateRange: new DateRange(input.startDate, input.endDate),
			currentBalance: input.currentBalance,
			initialBalance: input.initialBalance,
			timestamps: new Timestamps(input.createdAt),
		});

		expect(budget.id.value).toEqual(input.id);
		expect(budget.userId.value).toEqual(input.userId);
		expect(budget.dateRange.value.start).toEqual(input.startDate);
		expect(budget.dateRange.value.end).toEqual(input.endDate);
		expect(budget.currentBalance).toEqual(input.currentBalance);
		expect(budget.initialBalance).toEqual(input.initialBalance);
		expect(budget.timestamps.value.createdAt).toEqual(input.createdAt);
	});
});
