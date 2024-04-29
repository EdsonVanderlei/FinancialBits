import { AppError } from '../../shared/classes/app-error';
import { Repository } from '../../domain/repositories/repository';
import { Session } from '../../domain/entities/session/session';
import { User } from '../../domain/entities/user/user';
import { PasswordUtils } from '../../shared/utils/password/password.utils';
import { GenerateTokensUseCase } from '../generate-tokens/generate-tokens.use-case';
import { LoginUserUseCaseInput, LoginUserUseCaseOutput } from './login-user.use-case-io';

export class LoginUserUseCase {
	constructor(
		private userRepository: Repository<User>,
		private sessionRepository: Repository<Session>,
		private generateTokensUseCase: GenerateTokensUseCase
	) {}

	async exec(request: LoginUserUseCaseInput): Promise<LoginUserUseCaseOutput> {
		let user: User | null;
		try {
			user = await this.userRepository.findOne({ email: request.email ?? '' });
			if (!user || !(await PasswordUtils.validate(request.password, user.password))) {
				throw Error();
			}
		} catch (e) {
			throw new AppError('Invalid credentials', 400);
		}

		const tokens = this.generateTokensUseCase.exec({
			payload: { sub: user.id!, name: user.email },
		});

		const session = await this.sessionRepository.findOne({ userId: user.id! });
		if (session) {
			await this.sessionRepository.update({
				id: session.id,
				userId: user.id!,
				refreshToken: tokens.refresh,
			});
		} else {
			await this.sessionRepository.create({
				userId: user.id!,
				refreshToken: tokens.refresh,
			});
		}

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
