import { ServerError } from '../../core/server-error';
import { UseCase } from '../../core/use-case';
import { TokenUtils } from '../../utils/token/token.utils';
import { ValidationUtils } from '../../utils/validation/validation.utils';
import { FindSessionUseCase } from '../find-session/find-session-use-case';
import {
	GenerateTokensUseCase,
	GenerateTokensUseCaseResponse,
} from '../generate-tokens/generate-tokens-use-case';
import { SaveSessionUseCase } from '../save-session/save-session-use-case';

export type TokenUseCaseRequest = { refreshToken: string };

export type TokenUseCaseResponse = GenerateTokensUseCaseResponse;

export class TokenUseCase implements UseCase {
	constructor(
		private refreshSecret: string,
		private findSessionUseCase: FindSessionUseCase,
		private generateTokensUseCase: GenerateTokensUseCase,
		private saveSessionUseCase: SaveSessionUseCase
	) {}

	async exec(request: TokenUseCaseRequest): Promise<TokenUseCaseResponse> {
		if (!ValidationUtils.jwt(request.refreshToken)) {
			throw new ServerError('invalid refresh token', 400);
		}

		const payload = TokenUtils.decode(request.refreshToken, this.refreshSecret);
		const session = await this.findSessionUseCase.exec({ refreshToken: request.refreshToken });

		const tokens = this.generateTokensUseCase.exec({
			refreshToken: request.refreshToken,
			payload: { userId: payload.userId, userEmail: payload.userEmail },
		});

		await this.saveSessionUseCase.exec({
			userId: payload.userId,
			refreshToken: tokens.refresh,
		});

		return tokens;
	}
}
