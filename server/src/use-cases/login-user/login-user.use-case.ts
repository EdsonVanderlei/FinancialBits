import { ServerError } from '../../core/server-error';
import { UseCase } from '../../core/use-case';
import { User } from '../../entities/user';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';
import { PasswordUtils } from '../../utils/password/password.utils';
import {
	GenerateTokensUseCase,
	GenerateTokensUseCaseResponse,
} from '../generate-tokens/generate-tokens.use-case';

export type LoginUserUseCaseRequest = {
	email: string;
	password: string;
};

export type LoginUserUseCaseResponse = {
	user: Omit<User, 'id' | 'password'>;
	tokens: GenerateTokensUseCaseResponse;
};

export class LoginUserUseCase implements UseCase {
	constructor(
		private userService: UserService,
		private sessionService: SessionService,
		private generateTokensUseCase: GenerateTokensUseCase
	) {}

	async exec(request: LoginUserUseCaseRequest): Promise<LoginUserUseCaseResponse> {
		const user = await this.userService.findOne({ email: request.email });

		if (!(await PasswordUtils.validate(request.password, user.password))) {
			throw new ServerError('invalid credentials', 400);
		}

		const tokens = this.generateTokensUseCase.exec({
			payload: { userId: user.id!, userEmail: user.email },
		});

		await this.sessionService.save({
			userId: user.id!,
			refreshToken: tokens.refresh,
		});

		return {
			tokens,
			user: {
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
			},
		};
	}
}
