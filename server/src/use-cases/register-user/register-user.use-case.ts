import { AppError } from '../../shared/classes/app-error';
import { Repository } from '../../domain/repositories/repository';
import { Session } from '../../domain/entities/session/session';
import { User } from '../../domain/entities/user/user';
import { UserValidation } from '../../domain/validation/user/user-validation';
import { PasswordUtils } from '../../shared/utils/password/password.utils';
import { GenerateTokensUseCase } from '../generate-tokens/generate-tokens.use-case';
import { RegisterUserUseCaseInput, RegisterUserUseCaseOutput } from './register-user.use-case-io';

export class RegisterUserUseCase {
	constructor(
		private userRepository: Repository<User>,
		private sessionRepository: Repository<Session>,
		private generateTokensUseCase: GenerateTokensUseCase
	) {}

	async exec(request: RegisterUserUseCaseInput): Promise<RegisterUserUseCaseOutput> {
		let user = new User(null, request.email, request.password, request.firstName, request.lastName);

		UserValidation.validate(user);

		if (await this.userRepository.exists({ email: user.email })) {
			throw new AppError('Email already in use', 404);
		}

		user.password = await PasswordUtils.hash(user.password);

		user = await this.userRepository.create({
			email: user.email,
			password: user.password,
			firstName: user.firstName,
			lastName: user.lastName,
		});

		const tokens = this.generateTokensUseCase.exec({
			payload: { name: user.fullName ?? '', sub: user.id! },
		});

		await this.sessionRepository.create({
			userId: user.id!,
			refreshToken: tokens.refresh,
		});

		return {
			tokens,
			user: { email: user.email, firstName: user.firstName, lastName: user.lastName },
		};
	}
}
