import { NextFunction, Request, Response } from 'express';
import { ValidateTokenUseCase } from '../use-cases/validate-token/validate-token.use-case';

export const authMiddleware =
	(validateTokenUseCase: ValidateTokenUseCase) => (req: Request, res: Response, next: NextFunction) => {
		const authorizationHeader = req.headers.authorization ?? '';
		const result = validateTokenUseCase.exec({ authorizationHeader });
		req.body = { ...req.body, userFullname: result.name, userId: result.sub };
		next();
	};
