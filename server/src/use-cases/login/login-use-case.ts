import { ServerError } from '../../core/server-error';
import { UseCase } from '../../core/use-case';
import { User } from '../../entities/user';
import { PasswordUtils } from '../../utils/password/password.utils';
import { FindUserUseCase } from '../find-user/find-user-use-case';
import {
	GenerateTokensUseCase,
	GenerateTokensUseCaseResponse,
} from '../generate-tokens/generate-tokens-use-case';
import { SaveSessionUseCase } from '../save-session/save-session-use-case';

export type LoginUseCaseRequest = {
	email: string;
	password: string;
};

export type LoginUseCaseResponse = {
	user: Omit<User, 'id' | 'password'>;
	tokens: GenerateTokensUseCaseResponse;
};

export class LoginUseCase implements UseCase {
	constructor(
		private findUserUseCase: FindUserUseCase,
		private generateTokensUseCase: GenerateTokensUseCase,
		private saveSessionUseCase: SaveSessionUseCase
	) {}

	async exec(request: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
		const user = await this.findUserUseCase.exec({ email: request.email });

		if (!(await PasswordUtils.validate(request.password, user.password))) {
			throw new ServerError('invalid credentials', 400);
		}

		const tokens = this.generateTokensUseCase.exec({
			payload: { userId: user.id!, userEmail: user.email },
		});

		await this.saveSessionUseCase.exec({
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
