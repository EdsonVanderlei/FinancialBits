import { JWT } from '../../domain/data-objects/jwt/jwt';
import { AppError } from '../../shared/classes/app-error';
import { ValidateTokenUseCase } from './../../use-cases/auth/validate-token/validate-token.use-case';
import { Request, Response, NextFunction } from 'express';

export class AuthMiddleware {
	private validateTokenUseCase: ValidateTokenUseCase;

	constructor(accessSecretKey: string) {
		this.validateTokenUseCase = new ValidateTokenUseCase(accessSecretKey);
	}

	public exec = (req: Request, res: Response, next: NextFunction) => {
		let token: JWT;
		try {
			let tokenHeader = !!req.headers && req.headers.authorization;
			token = new JWT(tokenHeader?.split(' ')[1] ?? '');
		} catch (e: any) {
			throw new AppError(e.message ?? 'Unauthorized', 401);
		}

		const payload = this.validateTokenUseCase.exec({ accessToken: token.value });
		req.body = { ...req.body, userFullname: payload.userFullname, userId: payload.userId };
		
		next();
	};
}
