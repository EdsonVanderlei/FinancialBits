import { Request, Response } from 'express';
import { LoginUseCaseInput, LoginUseCaseOutput } from '../../use-cases/auth/login/login.use-case-io';
import { LogoutUseCaseInput, LogoutUseCaseOutput } from '../../use-cases/auth/logout/logout.use-case-io';
import { RefreshTokenUseCaseInput, RefreshTokenUseCaseOutput } from '../../use-cases/auth/refresh-token/refresh-token.use-case-io';
import { RegisterUseCaseInput, RegisterUseCaseOutput } from '../../use-cases/auth/register/register.use-case-io';
import { UseCase } from '../../use-cases/use-case';
import { Controller } from '../decorators/controller.decorator';
import { Route } from '../decorators/route.decorator';
import { HttpMethodEnum } from '../types/route-definition';

@Controller('/auth')
export class AuthController {
	constructor(
		private loginUserUseCase: UseCase<LoginUseCaseInput,LoginUseCaseOutput>,
		private logoutUserUseCase: UseCase<LogoutUseCaseInput,LogoutUseCaseOutput>,
		private registerUserUseCase: UseCase<RegisterUseCaseInput,RegisterUseCaseOutput>,
		private refreshTokenUseCase: UseCase<RefreshTokenUseCaseInput,RefreshTokenUseCaseOutput>,
	) {}

	@Route(HttpMethodEnum.POST, '/login')
	public async login(req: Request, res: Response) {
		const { email, password } = req.body;
		const result = await this.loginUserUseCase.exec({ email, password });
		return res.status(200).json(result);
	}

	@Route(HttpMethodEnum.POST, '/logout')
	public async logout(req: Request, res: Response) {
		const { refreshToken } = req.body;
		await this.logoutUserUseCase.exec({ refreshToken });
		return res.status(200).json({ message: 'Session successfully ended' });
	}

	@Route(HttpMethodEnum.POST, '/register')
	public async register(req: Request, res: Response) {
		const { email, firstName, password, lastName } = req.body;
		const result = await this.registerUserUseCase.exec({ email, password, firstName, lastName });
		return res.status(201).json(result);
	}

	@Route(HttpMethodEnum.POST, '/refresh')
	public async refreshToken(req: Request, res: Response) {
		const { refreshToken } = req.body;
		const result = await this.refreshTokenUseCase.exec({ refreshToken });
		return res.status(200).json(result);
	}
}
