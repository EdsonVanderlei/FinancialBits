import { AppError } from '../../../shared/classes/app-error';
import { Timestamps } from './timestamps';

describe('Timestamps', () => {
	test('Invalid created at date', () => {
		const timestamps = new Timestamps(-1, 1716044649000);

		expect(() => timestamps.validate()).toThrow({
			statusCode: 400,
			message: 'Invalid created at date',
		} as AppError);
	});
	test('Invalid updated at date', () => {
		const timestamps = new Timestamps(1716044649000, -1);

		expect(() => timestamps.validate()).toThrow({
			statusCode: 400,
			message: 'Invalid updated at date',
		} as AppError);
	});
});
