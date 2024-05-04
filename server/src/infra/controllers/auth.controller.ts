import { Request, Response } from 'express';
import { LoginUserUseCaseInput, LoginUserUseCaseOutput } from '../../use-cases/auth/login-user/login-user.use-case-io';
import {
	LogoutUserUseCaseInput,
	LogoutUserUseCaseOutput,
} from '../../use-cases/auth/logout-user/logout-user.use-case-io';
import {
	RefreshTokenUseCaseInput,
	RefreshTokenUseCaseOutput,
} from '../../use-cases/auth/refresh-token/refresh-token.use-case-io';
import {
	RegisterUserUseCaseInput,
	RegisterUserUseCaseOutput,
} from '../../use-cases/auth/register-user/register-user.use-case-io';
import { UseCase } from '../../use-cases/use-case';
import { Controller } from '../decorators/controller.decorator';
import { Route } from '../decorators/route.decorator';
import { HttpMethodEnum } from '../enums/http-method.enum';

@Controller('/auth')
export class AuthController {
	constructor(
		private loginUserUseCase: UseCase<LoginUserUseCaseInput, LoginUserUseCaseOutput>,
		private logoutUserUseCase: UseCase<LogoutUserUseCaseInput, LogoutUserUseCaseOutput>,
		private registerUserUseCase: UseCase<RegisterUserUseCaseInput, RegisterUserUseCaseOutput>,
		private refreshTokenUseCase: UseCase<RefreshTokenUseCaseInput, RefreshTokenUseCaseOutput>
	) {}

	@Route(HttpMethodEnum.POST, '/login')
	public async login(req: Request, res: Response) {
		const { email, password } = req.body;
		const result = await this.loginUserUseCase.exec({ email, password });
		return res.status(200).json(result);
	}

	@Route(HttpMethodEnum.POST, '/logout')
	public async logout(req: Request, res: Response) {
		const { email } = req.body;
		await this.logoutUserUseCase.exec({ email });
		return res.status(200).json({ message: 'Session successfully ended' });
	}

	@Route(HttpMethodEnum.POST, '/register')
	public async register(req: Request, res: Response) {
		const { email, firstName, password, lastName } = req.body;
		const result = await this.registerUserUseCase.exec({
			email,
			firstName,
			password,
			lastName,
		});
		return res.status(201).json(result);
	}

	@Route(HttpMethodEnum.POST, '/refresh')
	public async refreshToken(req: Request, res: Response) {
		const { refreshToken } = req.body;
		const result = await this.refreshTokenUseCase.exec({ refreshToken });
		return res.status(200).json(result);
	}
}
