import { NextFunction, Request, Response } from 'express';
import { ErrorUtils } from '../error/error.utils';

export abstract class ExpressUtils {
	static globalErrorHandler() {
		return (err: Error, req: Request, res: Response, next: NextFunction) => {
			const error = ErrorUtils.handleError(err);
			return res.status(error.statusCode).json({ message: error.message });
		};
	}

	static asyncErrorHandler(
		func: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
	) {
		return (req: Request, res: Response, next: NextFunction) => {
			func(req, res, next).catch(err => next(err));
		};
	}
}
