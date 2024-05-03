import { Email } from '../../domain/data-objects/email/email';
import { User } from '../../domain/entities/user/user';
import { SessionRepository } from '../../domain/repositories/session-repository';
import { UserRepository } from '../../domain/repositories/user-repository';
import { AppError } from '../../shared/classes/app-error';
import { JWT } from './../../domain/data-objects/jwt/jwt';
import { LoginUserUseCaseInput, LoginUserUseCaseOutput } from './login-user.use-case-io';

export class LoginUserUseCase {
	constructor(
		private accessSecretKey: string,
		private refreshSecretKey: string,
		private userRepository: UserRepository,
		private sessionRepository: SessionRepository
	) {}

	async exec(request: LoginUserUseCaseInput): Promise<LoginUserUseCaseOutput> {
		let user: User | null;
		try {
			user = await this.userRepository.findOne({ email: new Email(request.email) });
			if (!user || !user.comparePassword(request.password)) throw Error();
		} catch (e) {
			throw new AppError('Invalid credentials', 400);
		}

		const payload = { sub: user.id!.value, name: user.fullName };
		const tokens = {
			access: JWT.generate(payload, this.accessSecretKey, { expiresIn: '5m' }),
			refresh: JWT.generate(payload, this.refreshSecretKey),
		};

		const session = await this.sessionRepository.findOne({ userId: user.id! });
		if (session) {
			await this.sessionRepository.update({
				id: session.id!,
				userId: user.id!,
				refreshToken: tokens.refresh,
				createdAt: session.createdAt
			});
		} else {
			await this.sessionRepository.create({
				userId: user.id!,
				refreshToken: tokens.refresh,
			});
		}

		return {
			tokens: {
				access: tokens.access.value,
				refresh: tokens.refresh.value,
			},
			user: {
				email: user.email.value,
				firstName: user.firstName,
				lastName: user.lastName,
			},
		};
	}
}
