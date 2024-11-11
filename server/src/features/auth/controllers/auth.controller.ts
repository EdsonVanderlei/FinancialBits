import { Body, Controller, HttpCode, HttpException, Post } from '@nestjs/common';
import { TokensService } from '../services/tokens.service';
import { UserService } from '../services/user.service';
import { LoginRequestDTO, LoginResponseDTO } from '../types/login.dto';
import { RefreshRequestDTO, RefreshResponseDTO } from '../types/refresh.dto';
import { RegisterRequestDTO, RegisterResponseDTO } from '../types/register.dto';
import { TokenPayload } from '../types/token-payload';

@Controller('auth')
export class AuthController {
	constructor(
		private tokensService: TokensService,
		private userService: UserService,
	) {}

	@Post('login')
	@HttpCode(200)
	async login(@Body() body: LoginRequestDTO): Promise<LoginResponseDTO> {
		const user = await this.userService.findByEmail(body.email);
		if (!user) throw new HttpException('user not found', 404);

		const passwordMatch = await this.userService.comparePassword(body.password, user.password);
		if (!passwordMatch) throw new HttpException('wrong password', 400);

		const tokens = await this.tokensService.generateTokens(user.id, user.name, user.email);
		return { tokens, user: { email: user.email, name: user.name } };
	}

	@Post('register')
	@HttpCode(201)
	async register(@Body() body: RegisterRequestDTO): Promise<RegisterResponseDTO> {
		const exists = await this.userService.existsByEmail(body.email);
		if (exists) throw new HttpException('email already in use', 400);

		const user = await this.userService.create(body.name, body.email, body.password);
		const tokens = await this.tokensService.generateTokens(user.id, user.name, user.email);
		return { tokens, user: { email: user.email, name: user.name } };
	}

	@Post('refresh')
	@HttpCode(200)
	async refresh(@Body() body: RefreshRequestDTO): Promise<RefreshResponseDTO> {
		let payload: TokenPayload | undefined = undefined;
		try {
			payload = await this.tokensService.verifyRefreshToken(body.refreshToken);
		} catch {
			throw new HttpException('invalid token', 401);
		}
		if (!payload) throw new HttpException('invalid token', 401);

		const accessToken = await this.tokensService.generateAccessToken(payload.sub, payload.user.name, payload.user.email);
		return { accessToken };
	}
}
