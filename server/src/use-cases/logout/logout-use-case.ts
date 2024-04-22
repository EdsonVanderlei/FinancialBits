import { UseCase } from '../../core/use-case';
import { User } from '../../entities/user';
import { DeleteSessionUseCase } from '../delete-session/delete-session-use-case';
import { FindUserUseCase } from '../find-user/find-user-use-case';

export type LogoutUseCaseRequest = Pick<User, 'email'>;

export type LogoutUseCaseResponse = Omit<User, 'id' | 'password'>;

export class LogoutUseCase implements UseCase {
	constructor(
		private findUserUseCase: FindUserUseCase,
		private deleteSessionUseCase: DeleteSessionUseCase
	) {}

	async exec(request: LogoutUseCaseRequest): Promise<LogoutUseCaseResponse> {
		const user = await this.findUserUseCase.exec({ email: request.email });
		await this.deleteSessionUseCase.exec({ userId: user.id! });

		return {
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
		};
	}
}
