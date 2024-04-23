import { ServerError } from '../../core/server-error';
import { UseCase } from '../../core/use-case';
import { TokenUtils } from '../../utils/token/token.utils';
import { ValidationUtils } from '../../utils/validation/validation.utils';
import {
	GenerateTokensUseCase,
	GenerateTokensUseCaseResponse,
} from '../generate-tokens/generate-tokens.use-case';

export type RefreshTokenUseCaseRequest = { refreshToken: string };

export type RefreshTokenUseCaseResponse = GenerateTokensUseCaseResponse;

export class RefreshTokenUseCase implements UseCase {
	constructor(
		private refreshSecret: string,
		private generateTokensUseCase: GenerateTokensUseCase
	) {}

	async exec(request: RefreshTokenUseCaseRequest): Promise<RefreshTokenUseCaseResponse> {
		if (!ValidationUtils.jwt(request.refreshToken)) { 
			throw new ServerError('invalid refresh token', 400);
		}

		const payload = TokenUtils.decode(request.refreshToken, this.refreshSecret);

		const tokens = this.generateTokensUseCase.exec({
			refreshToken: request.refreshToken,
			payload: { userId: payload.userId, userEmail: payload.userEmail },
		});

		return tokens;
	}
}
