import { AppError } from '../../../classes/app-error';
import { Timestamps } from './timestamps';

describe('Timestamps', () => {
	test('Create', () => {
		const input = { createdAt: new Date() };

		expect(() => Timestamps.create(input)).not.toThrow();
	});
	test('Generate', () => {
		const timestamps = Timestamps.generate();

		expect(timestamps).toBeDefined();
		expect(() => timestamps.validate()).not.toThrow();
	});
	test('Invalid created at date', () => {
		const input = { createdAt: new Date('abc') };

		expect(() => Timestamps.create(input)).toThrow({
			statusCode: 400,
			message: 'Invalid created at date',
		} as AppError);
	});
	test('Invalid updated at date', () => {
		const input = { createdAt: new Date(), updatedAt: new Date('abc') };

		expect(() => Timestamps.create(input)).toThrow({
			statusCode: 400,
			message: 'Invalid updated at date',
		} as AppError);
	});
});
