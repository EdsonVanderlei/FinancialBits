import { Email } from '../../../domain/data-objects/email/email';
import { Session } from '../../../domain/entities/session/session';
import { User } from '../../../domain/entities/user/user';
import { Repository } from '../../../domain/repositories/repository';
import { UseCase } from '../../use-case';
import { LogoutUserUseCaseInput, LogoutUserUseCaseOutput } from './logout-user.use-case-io';

export class LogoutUserUseCase implements UseCase<LogoutUserUseCaseInput, LogoutUserUseCaseOutput> {
	constructor(private userRepository: Repository<User>, private sessionRepository: Repository<Session>) {}

	async exec(request: LogoutUserUseCaseInput): Promise<LogoutUserUseCaseOutput> {
		const user = await this.userRepository.findOne({ email: new Email(request.email) });
		if (!user) return;
		await this.sessionRepository.delete({ userId: user.id });
	}
}
