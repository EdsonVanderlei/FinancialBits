import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { SessionRepository } from '../../../domain/repositories/session/session.repository';
import { LogoutUseCaseInput, LogoutUseCaseOutput } from './logout.use-case-io';

export class LogoutUseCase {
	constructor(private sessionRepository: SessionRepository) {}

	async exec(request: LogoutUseCaseInput): Promise<LogoutUseCaseOutput> {
		const userId = UUID.create(request.userId);
		await this.sessionRepository.deleteByUserId(userId);
	}
}
