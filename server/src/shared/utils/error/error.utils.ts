import { AppError } from '../../classes/app-error';

export abstract class ErrorUtils {
	static handleError(e: any): AppError {
		let error: AppError;
		if (e.statusCode && e.statusCode !== 500) {
			error = new AppError(e.message, e.statusCode);
		} else {
			error = new AppError('Internal server error', 500);
		}
		return error;
	}
}
