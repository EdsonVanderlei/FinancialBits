import { UseCase } from '../../core/use-case';
import { User } from '../../entities/user';
import { CreateUserUseCase } from '../create-user/create-user-use-case';
import {
  GenerateTokensUseCase,
  GenerateTokensUseCaseResponse,
} from '../generate-tokens/generate-tokens-use-case';
import { SaveSessionUseCase } from '../save-session/save-session-use-case';

export type RegisterUseCaseRequest = {
	email: string;
	password: string;
	firstName: string;
	lastName?: string;
};

export type RegisterUseCaseResponse = {
	user: Omit<User, 'id' | 'password'>;
	tokens: GenerateTokensUseCaseResponse;
};

export class RegisterUseCase implements UseCase {
	constructor(
		private createUserUseCase: CreateUserUseCase,
		private generateTokensUseCase: GenerateTokensUseCase,
		private saveSessionUseCase: SaveSessionUseCase
	) {}

	async exec(request: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
		const user = await this.createUserUseCase.exec({
			email: request.email,
			password: request.password,
			firstName: request.firstName,
			lastName: request.lastName,
		});

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
