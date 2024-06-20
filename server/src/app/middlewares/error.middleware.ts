import { Request, Response } from 'express';
import { AppError } from '../../shared/classes/app-error';

export const errorMiddleware = (err: Error, req: Request, res: Response) => {
	let error: AppError;
	if (err instanceof AppError && err.statusCode && err.statusCode !== 500) {
		error = new AppError(err.message, err.statusCode);
	} else {
		error = new AppError('Internal server error', 500);
	}
	return res.status(error.statusCode).json({ message: error.message });
};
