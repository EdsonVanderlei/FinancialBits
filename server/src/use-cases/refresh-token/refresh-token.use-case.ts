import { AppError } from '../../shared/classes/app-error';
import { TokenUtils } from '../../shared/utils/token/token.utils';
import { ValidationUtils } from '../../shared/utils/validation/validation.utils';
import { GenerateTokensUseCase } from '../generate-tokens/generate-tokens.use-case';
import {
	RefreshTokenUseCaseInput,
	RefreshTokenUseCaseOutput,
} from './refresh-token.use-case-io';

export class RefreshTokenUseCase {
	constructor(
		private refreshSecretKey: string,
		private generateTokensUseCase: GenerateTokensUseCase
	) {}

	async exec(request: RefreshTokenUseCaseInput): Promise<RefreshTokenUseCaseOutput> {
		if (!ValidationUtils.jwt(request.refreshToken)) {
			throw new AppError('Invalid refresh token', 400);
		}

		TokenUtils.verify(request.refreshToken, this.refreshSecretKey);

		const payload = TokenUtils.decode(request.refreshToken);

		const tokens = this.generateTokensUseCase.exec({
			refreshToken: request.refreshToken,
			payload: { sub: payload!.sub!, name: payload!.name },
		});

		return tokens;
	}
}
