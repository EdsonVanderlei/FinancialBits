import { NextFunction, Request, Response } from 'express';
import { JWT } from '../../domain/data-objects/jwt/jwt';
import { AppError } from '../../shared/classes/app-error';
import {
	ValidateTokenUseCaseInput,
	ValidateTokenUseCaseOutput,
} from '../../use-cases/auth/validate-token/validate-token.use-case-io';
import { UseCase } from '../../use-cases/use-case';

export const authMiddleware =
	(validateTokenUseCase: UseCase<ValidateTokenUseCaseInput, ValidateTokenUseCaseOutput>) =>
	(req: Request, res: Response, next: NextFunction) => {
		let token: JWT;
		try {
			let tokenHeader = !!req.headers && req.headers.authorization;
			token = new JWT(tokenHeader?.split(' ')[1] ?? '');
		} catch (e: any) {
			throw new AppError(e.message ?? 'Unauthorized', 401);
		}

		const payload = validateTokenUseCase.exec({ accessToken: token.value }) as ValidateTokenUseCaseOutput;
		req.body = { ...req.body, userFullname: payload.userFullname, userId: payload.userId };

		next();
	};
