import { AppError } from '../../../shared/classes/app-error';
import { Validator } from '../../../shared/domain/validator';
import { UseCase } from '../../../shared/use-case';
import { SessionToken } from '../../classes/session-token';
import { Email } from '../../domain/data-objects/email/email';
import { Password } from '../../domain/data-objects/password/password';
import { Session } from '../../domain/entities/session/session';
import { User } from '../../domain/entities/user/user';
import { SessionRepository } from '../../domain/repositories/session/session.repository';
import { UserRepository } from '../../domain/repositories/user/user.repository';
import { RegisterUseCaseInput, RegisterUseCaseOutput } from './register.use-case-io';

export class RegisterUseCase implements UseCase<RegisterUseCaseInput, RegisterUseCaseOutput> {
	constructor(
		private userRepository: UserRepository,
		private sessionRepository: SessionRepository,
		private createUserValidator: Validator<User>,
		private secretKeys: { access: string; refresh: string },
	) {}

	async exec(request: RegisterUseCaseInput) {
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
		const user = User.create({
			email: Email.create(request.email),
			password: Password.create(request.password),
			firstName: request.firstName,
			lastName: request.lastName,
		});

		user.validate(this.createUserValidator);
		if (await this.userRepository.findByEmail(user.email)) {
			throw new AppError('Email already in use', 400);
		}

		return await this.userRepository.create(user);
	}

	async createSession(user: User) {
		const sessionToken = new SessionToken({ userId: user.id, userFullName: user.fullName }, this.secretKeys);
		const session = Session.create({ userId: user.id!, refreshToken: sessionToken.refreshToken });
		await this.sessionRepository.create(session);
		return sessionToken.asString;
	}
}
