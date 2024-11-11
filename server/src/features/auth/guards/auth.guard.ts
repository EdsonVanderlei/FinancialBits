import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { TokensService } from '../services/tokens.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private tokensService: TokensService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) throw new HttpException('token is required', 401);

		try {
			const payload = await this.tokensService.verifyAccessToken(token);
			request['user'] = { ...payload.user, id: payload.sub };
		} catch {
			throw new HttpException('invalid token', 401);
		}
		return true;
	}

	private extractTokenFromHeader(request: Request) {
		const [type, token] = request.headers['authorization']?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
