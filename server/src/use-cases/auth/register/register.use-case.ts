import { Email } from '../../../domain/data-objects/email/email';
import { Password } from '../../../domain/data-objects/password/password';
import { Session } from '../../../domain/entities/session/session';
import { User } from '../../../domain/entities/user/user';
import { SessionRepository } from '../../../domain/repositories/session/session.repository';
import { UserRepository } from '../../../domain/repositories/user/user.repository';
import { AppError } from '../../../shared/classes/app-error';
import { SessionToken } from '../../../shared/classes/session-token';
import { RegisterUseCaseInput, RegisterUseCaseOutput } from './register.use-case-io';

export class RegisterUseCase {
	constructor(
		private userRepository: UserRepository,
		private sessionRepository: SessionRepository,
		private secretKeys: { access: string; refresh: string }
	) {}

	async exec(request: RegisterUseCaseInput): Promise<RegisterUseCaseOutput> {
		const user = await this.createUser(request);
		const tokens = await this.createSession(user);
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

	async createUser(request: RegisterUseCaseInput) {
		let user = User.create({
			email: new Email(request.email),
			password: new Password(request.password),
			firstName: request.firstName,
			lastName: request.lastName,
		});

		user.validateCreate();
		if (await this.userRepository.findByEmail(user.email)) {
			throw new AppError('Email already in use', 404);
		}
		user.password.hash();

		return await this.userRepository.create(user);
	}

	async createSession(user: User) {
		const sessionToken = new SessionToken({ sub: user.id.value, name: user.fullName }, this.secretKeys);
		const session = Session.create({ userId: user.id!, refreshToken: sessionToken.refreshToken });
		await this.sessionRepository.create(session);
		return sessionToken.asString;
	}
}
