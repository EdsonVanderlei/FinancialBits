import { AppError } from '../../classes/app-error';
import { ErrorUtils } from './error.utils';

describe('ErrorUtils', () => {
	test('server error', async () => {
		const error = new AppError('test error', 400);
		const result = ErrorUtils.handleError(error);

		expect(result.statusCode).toBe(400);
		expect(result.message).toBe('test error');
	});

	test('Internal server error', async () => {
		const error = new AppError('test error', 500);
		const result = ErrorUtils.handleError(error);

		expect(result.statusCode).toBe(500);
		expect(result.message).toBe('Internal server error');
	});

	test('error', async () => {
		const error = new Error('test error');
		const result = ErrorUtils.handleError(error);

		expect(result.statusCode).toBe(500);
		expect(result.message).toBe('Internal server error');
	});
});
