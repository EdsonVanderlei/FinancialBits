import { AppError } from '../../../shared/classes/app-error';
import { UUID } from '../../../shared/domain/data-objects/uuid/uuid';
import { UseCase } from '../../../shared/use-case';
import { SessionToken } from '../../classes/session-token';
import { JWT } from '../../domain/data-objects/jwt/jwt';
import { SessionRepository } from '../../domain/repositories/session/session.repository';
import { RefreshTokenUseCaseInput, RefreshTokenUseCaseOutput } from './refresh-token.use-case-io';

export class RefreshTokenUseCase implements UseCase<RefreshTokenUseCaseInput, RefreshTokenUseCaseOutput> {
	constructor(
		private sessionRepository: SessionRepository,
		private secretKeys: { access: string; refresh: string },
	) {}

	async exec(request: RefreshTokenUseCaseInput) {
		const refreshToken = JWT.create(request.refreshToken);
		refreshToken.verify(this.secretKeys.refresh);
		const userId = UUID.create(refreshToken.payload?.sub ?? '');

		const session = await this.sessionRepository.findByUserId(userId);
		if (!session) {
			throw new AppError('Session not found', 404);
		}

		const sessionToken = new SessionToken(
			{ userId, userFullName: refreshToken.payload!.name },
			this.secretKeys,
			session.refreshToken,
		);
		return sessionToken.asString;
	}
}
