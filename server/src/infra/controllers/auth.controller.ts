import { Request, Response } from 'express';
import { SessionRepository } from '../../domain/repositories/session-repository';
import { UserRepository } from '../../domain/repositories/user-repository';
import { LoginUserUseCase } from '../../use-cases/auth/login-user/login-user.use-case';
import { LogoutUserUseCase } from '../../use-cases/auth/logout-user/logout-user.use-case';
import { RefreshTokenUseCase } from '../../use-cases/auth/refresh-token/refresh-token.use-case';
import { RegisterUserUseCase } from '../../use-cases/auth/register-user/register-user.use-case';
import { Controller } from '../decorators/controller.decorator';
import { Route } from '../decorators/route.decorator';
import { HttpMethodEnum } from '../enums/http-method.enum';

@Controller('/auth')
export class AuthController {
	private loginUserUseCase: LoginUserUseCase;
	private logoutUserUseCase: LogoutUserUseCase;
	private registerUserUseCase: RegisterUserUseCase;
	private refreshTokenUseCase: RefreshTokenUseCase;

	constructor(
		accessSecretKey: string,
		refreshSecretKey: string,
		userRepository: UserRepository,
		sessionRepository: SessionRepository
	) {
		this.loginUserUseCase = new LoginUserUseCase(accessSecretKey, refreshSecretKey, userRepository, sessionRepository);
		this.logoutUserUseCase = new LogoutUserUseCase(userRepository, sessionRepository);
		this.registerUserUseCase = new RegisterUserUseCase(
			accessSecretKey,
			refreshSecretKey,
			userRepository,
			sessionRepository
		);
		this.refreshTokenUseCase = new RefreshTokenUseCase(accessSecretKey, refreshSecretKey);
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
