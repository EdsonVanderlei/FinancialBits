import { Email } from '../../domain/data-objects/email/email';
import { SessionRepository } from '../../domain/repositories/session-repository';
import { UserRepository } from '../../domain/repositories/user-repository';
import {
	LogoutUserUseCaseInput,
	LogoutUserUseCaseOutput,
} from './logout-user.use-case-io';

export class LogoutUserUseCase {
	constructor(
		private userRepository: UserRepository,
		private sessionRepository: SessionRepository
	) {}

	async exec(request: LogoutUserUseCaseInput): Promise<LogoutUserUseCaseOutput> {
		const user = await this.userRepository.findOne({ email: new Email(request.email) });
		if (!user) return;
		await this.sessionRepository.delete({ userId: user.id });
	}
}
