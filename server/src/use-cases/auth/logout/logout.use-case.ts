import { JWT } from '../../../domain/data-objects/jwt/jwt';
import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { SessionRepository } from '../../../domain/repositories/session/session.repository';
import { UseCase } from '../../use-case';
import { LogoutUseCaseInput, LogoutUseCaseOutput } from './logout.use-case-io';

export class LogoutUseCase implements UseCase<LogoutUseCaseInput, LogoutUseCaseOutput> {
	constructor(
		private sessionRepository: SessionRepository,
		private refreshSecretKey: string,
	) {}

	async exec(request: LogoutUseCaseInput) {
		const refreshToken = JWT.create(request.refreshToken);
		refreshToken.verify(this.refreshSecretKey);
		const payload = refreshToken.payload;
		const userId = UUID.create(payload?.sub ?? '');
		await this.sessionRepository.deleteByUserId(userId);
	}
}
