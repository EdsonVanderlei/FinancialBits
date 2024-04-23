import { ServerError } from '../../core/server-error';
import { UseCase } from '../../core/use-case';
import { TokenUtils } from '../../utils/token/token.utils';
import { ValidationUtils } from '../../utils/validation/validation.utils';

export type GenerateTokensUseCaseRequest = {
	refreshToken?: string;
	accessExpiresIn?: string;
	payload: { userId: string; userEmail: string };
};

export type GenerateTokensUseCaseResponse = {
	access: string;
	refresh: string;
};

export class GenerateTokensUseCase implements UseCase {
	constructor(private accessSecret: string, private refreshSecret: string) {}

	exec(request: GenerateTokensUseCaseRequest) {
		if (!ValidationUtils.uuid(request.payload.userId)) {
			throw new ServerError('invalid user identifier', 400);
		}

		if (!ValidationUtils.email(request.payload.userEmail)) {
			throw new ServerError('invalid user email', 400);
		}

		if (request.refreshToken && !ValidationUtils.jwt(request.refreshToken)) {
			throw new ServerError('invalid refresh token', 400);
		}

		const access = TokenUtils.generate(request.payload, this.accessSecret, {
			expiresIn: request.accessExpiresIn ?? '30m',
		});

		const refresh =
			request.refreshToken ?? TokenUtils.generate(request.payload, this.refreshSecret);

		if (!access || !refresh) throw new ServerError('internal server error', 500);

		return { access, refresh };
	}
}
