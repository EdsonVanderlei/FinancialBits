import { JWT } from '../../../domain/data-objects/jwt/jwt';
import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { SessionToken } from '../../../shared/classes/session-token';
import { RefreshTokenUseCaseInput, RefreshTokenUseCaseOutput } from './refresh-token.use-case-io';

export class RefreshTokenUseCase {
	constructor(private secretKeys: { access: string; refresh: string }) {}

	async exec(request: RefreshTokenUseCaseInput): Promise<RefreshTokenUseCaseOutput> {
		const refreshToken = JWT.create(request.refreshToken);
		refreshToken.verify(this.secretKeys.refresh);
		const userId = UUID.create(refreshToken.payload?.sub ?? '');
		const session = new SessionToken(
			{ userId, userFullName: refreshToken.payload!.name },
			this.secretKeys,
			refreshToken
		);
		return session.asString;
	}
}
