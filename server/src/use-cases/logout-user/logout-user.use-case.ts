import { UseCase } from '../../core/use-case';
import { User } from '../../entities/user';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';

export type LogoutUserUseCaseRequest = Pick<User, 'email'>;

export type LogoutUserUseCaseResponse = Omit<User, 'id' | 'password'>;

export class LogoutUserUseCase implements UseCase {
	constructor(private userService: UserService, private sessionService: SessionService) {}

	async exec(request: LogoutUserUseCaseRequest): Promise<LogoutUserUseCaseResponse> {
		const user = await this.userService.findOne({ email: request.email });
		await this.sessionService.delete({ userId: user.id! });

		return {
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
		};
	}
}
