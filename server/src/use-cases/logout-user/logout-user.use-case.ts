import { Repository } from '../../domain/repositories/repository';
import { Session } from '../../domain/entities/session/session';
import { User } from '../../domain/entities/user/user';
import { LogoutUserUseCaseInput, LogoutUserUseCaseOutput } from './logout-user.use-case-io';

export class LogoutUserUseCase {
	constructor(
		private userRepository: Repository<User>,
		private sessionRepository: Repository<Session>
	) {}

	async exec(request: LogoutUserUseCaseInput): Promise<LogoutUserUseCaseOutput> {
		const user = await this.userRepository.findOne({ email: request.email });
		await this.sessionRepository.delete({ userId: user?.id ?? '' });
	}
}
