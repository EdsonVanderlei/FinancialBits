import { UseCase } from '../../core/use-case';
import { User } from '../../entities/user';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';
import {
	GenerateTokensUseCase,
	GenerateTokensUseCaseResponse,
} from '../generate-tokens/generate-tokens.use-case';

export type RegisterUserUseCaseRequest = {
	email: string;
	password: string;
	firstName: string;
	lastName?: string;
};

export type RegisterUserUseCaseResponse = {
	user: Omit<User, 'id' | 'password'>;
	tokens: GenerateTokensUseCaseResponse;
};

export class RegisterUserUseCase implements UseCase {
	constructor(
		private userService: UserService,
		private sessionService: SessionService,
		private generateTokensUseCase: GenerateTokensUseCase
	) {}

	async exec(request: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
		const user = await this.userService.save({
			email: request.email,
			password: request.password,
			firstName: request.firstName,
			lastName: request.lastName,
		});

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
