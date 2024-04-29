import { Request, Response } from 'express';
import { Session } from '../../domain/entities/session/session';
import { User } from '../../domain/entities/user/user';
import { Repository } from '../../domain/repositories/repository';
import { Controller } from '../decorators/controller.decorator';
import { Route } from '../decorators/route.decorator';
import { HttpMethodEnum } from '../enums/http-method.enum';
import { GenerateTokensUseCase } from '../../use-cases/generate-tokens/generate-tokens.use-case';
import { LoginUserUseCase } from '../../use-cases/login-user/login-user.use-case';
import { LogoutUserUseCase } from '../../use-cases/logout-user/logout-user.use-case';
import { RefreshTokenUseCase } from '../../use-cases/refresh-token/refresh-token.use-case';
import { RegisterUserUseCase } from '../../use-cases/register-user/register-user.use-case';

@Controller('/auth')
export class AuthController {
	private loginUserUseCase: LoginUserUseCase;
	private logoutUserUseCase: LogoutUserUseCase;
	private registerUserUseCase: RegisterUserUseCase;
	private refreshTokenUseCase: RefreshTokenUseCase;

	constructor(
		tokenSecrets: { access: string; refresh: string },
		repositories: { user: Repository<User>; session: Repository<Session> }
	) {
		const generateTokensUseCase = new GenerateTokensUseCase(
			tokenSecrets.access,
			tokenSecrets.refresh
		);
		this.loginUserUseCase = new LoginUserUseCase(
			repositories.user,
			repositories.session,
			generateTokensUseCase
		);
		this.logoutUserUseCase = new LogoutUserUseCase(repositories.user, repositories.session);
		this.registerUserUseCase = new RegisterUserUseCase(
			repositories.user,
			repositories.session,
			generateTokensUseCase
		);
		this.refreshTokenUseCase = new RefreshTokenUseCase(tokenSecrets.refresh, generateTokensUseCase);
	}

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

		return res.status(200).json({message: 'Session successfully ended'});
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
