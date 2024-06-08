import { JWT } from '../../../domain/data-objects/jwt/jwt';
import { AppError } from '../../../shared/classes/app-error';
import { SessionToken } from '../../../shared/classes/session-token';
import { RefreshTokenUseCaseInput, RefreshTokenUseCaseOutput } from './refresh-token.use-case-io';

export class RefreshTokenUseCase {
	constructor(private secretKeys: { access: string; refresh: string }) {}

	async exec(request: RefreshTokenUseCaseInput): Promise<RefreshTokenUseCaseOutput> {
		const refreshToken = new JWT(request.refreshToken);
		refreshToken.validate();
		let payload = refreshToken.verify(this.secretKeys.refresh);
		if (!payload || !payload.sub || !payload.name) throw new AppError('Invalid token', 400);

		const session = new SessionToken(
			{ sub: payload.sub, name: payload.name },
			this.secretKeys,
			refreshToken
		);
		return session.asString;
	}
}
