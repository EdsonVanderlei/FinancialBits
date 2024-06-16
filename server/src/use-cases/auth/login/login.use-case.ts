import { Email } from '../../../domain/data-objects/email/email';
import { Session } from '../../../domain/entities/session/session';
import { User } from '../../../domain/entities/user/user';
import { SessionRepository } from '../../../domain/repositories/session/session.repository';
import { UserRepository } from '../../../domain/repositories/user/user.repository';
import { AppError } from '../../../shared/classes/app-error';
import { SessionToken } from '../../../shared/classes/session-token';
import { UseCase } from '../../use-case';
import { LoginUseCaseInput, LoginUseCaseOutput } from './login.use-case-io';

export class LoginUseCase implements UseCase<LoginUseCaseInput, LoginUseCaseOutput> {
	constructor(
		private userRepository: UserRepository,
		private sessionRepository: SessionRepository,
		private secretKeys: { access: string; refresh: string }
	) {}

	async exec(request: LoginUseCaseInput) {
		const email = Email.create(request.email);
		const user = await this.loginUser(email, request.password);
		const tokens = await this.updateSession(user);
		return {
			tokens,
			user: {
				id: user.id.value,
				email: user.email.value,
				firstName: user.firstName,
				lastName: user.lastName,
				...user.timestamps.value,
			},
		};
	}

	async loginUser(email: Email, password: string) {
		try {
			const user = await this.userRepository.findByEmail(email);
			if (!user) throw Error();
			user.comparePassword(password);
			return user;
		} catch (e) {
			throw new AppError('Invalid credentials', 400);
		}
	}

	async updateSession(user: User) {
		let session = await this.sessionRepository.findByUserId(user.id);
		const sessionToken = new SessionToken(
			{ userId: user.id, userFullName: user.fullName },
			this.secretKeys,
			session?.refreshToken
		);
		if (!session) {
			session = Session.create({ refreshToken: sessionToken.refreshToken, userId: user.id! });
			await this.sessionRepository.create(session);
		}
		return sessionToken.asString;
	}
}
