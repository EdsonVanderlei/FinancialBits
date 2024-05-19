import { AppError } from '../../../shared/classes/app-error';
import { DateRange } from './date-range';

describe('DateRange', () => {
	test('valid date', () => {
		const dateRange = new DateRange(1715437270, 1718115670000);

		expect(dateRange).toBeDefined();
	});
	test('Invalid start date', () => {
		const range = new DateRange(-1, 1718115670000);

		expect(() => range.validate()).toThrow({
			statusCode: 400,
			message: 'Invalid start date',
		} as AppError);
	});
	test('Invalid end date', () => {
		const range = new DateRange(1718115670000, -1);

		expect(() => range.validate()).toThrow({
			statusCode: 400,
			message: 'Invalid end date',
		} as AppError);
	});
	test('Invalid date range', () => {
		const range = new DateRange(1718115670000, 1715437270);
		
		expect(() => range.validate()).toThrow({
			statusCode: 400,
			message: 'End date should be greater than start date',
		} as AppError);
	});
});
