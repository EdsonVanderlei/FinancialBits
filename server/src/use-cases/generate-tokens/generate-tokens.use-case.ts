import { AppError } from '../../shared/classes/app-error';
import { TokenUtils } from '../../shared/utils/token/token.utils';
import { ValidationUtils } from '../../shared/utils/validation/validation.utils';
import {
	GenerateTokensUseCaseInput,
	GenerateTokensUseCaseOutput,
} from './generate-tokens.use-case-io';

export class GenerateTokensUseCase {
	constructor(private accessSecretKey: string, private refreshSecretKey: string) {}

	exec(request: GenerateTokensUseCaseInput): GenerateTokensUseCaseOutput {
		if (!ValidationUtils.uuid(request.payload.sub)) {
			throw new AppError('Invalid user identifier', 500);
		}

		if (request.refreshToken && !ValidationUtils.jwt(request.refreshToken)) {
			throw new AppError('Invalid refresh token', 500);
		}

		const access = TokenUtils.generate(request.payload, this.accessSecretKey, {
			expiresIn: request.accessExpiresIn ?? '30m',
		});

		let refresh = request.refreshToken;
		if (!refresh) {
			refresh = TokenUtils.generate(request.payload, this.refreshSecretKey);
		}

		if (!access || !refresh) throw new AppError("Couldn't generate tokens", 500);

		return { access, refresh };
	}
}
