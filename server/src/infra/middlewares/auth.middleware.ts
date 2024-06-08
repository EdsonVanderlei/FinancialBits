import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../shared/classes/app-error';
import { ValidateTokenUseCase } from '../../use-cases/auth/validate-token/validate-token.use-case';

export const authMiddleware =
	(validateTokenUseCase: ValidateTokenUseCase) => (req: Request, res: Response, next: NextFunction) => {
		let authorizationHeader = !!req.headers && req.headers.authorization;
		if (!authorizationHeader) throw new AppError('Bearer token is required', 401);

		const result = validateTokenUseCase.exec({ authorizationHeader });
		req.body = { ...req.body, userFullname: result.userFullname, userId: result.userId };

		next();
	};
