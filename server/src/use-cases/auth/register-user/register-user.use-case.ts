import { Email } from '../../../domain/data-objects/email/email';
import { JWT } from '../../../domain/data-objects/jwt/jwt';
import { Password } from '../../../domain/data-objects/password/password';
import { Session } from '../../../domain/entities/session/session';
import { User } from '../../../domain/entities/user/user';
import { Repository } from '../../../domain/repositories/repository';
import { AppError } from '../../../shared/classes/app-error';
import { UseCase } from '../../use-case';
import { RegisterUserUseCaseInput, RegisterUserUseCaseOutput } from './register-user.use-case-io';

export class RegisterUserUseCase implements UseCase<RegisterUserUseCaseInput, RegisterUserUseCaseOutput> {
	constructor(
		private accessSecretKey: string,
		private refreshSecretKey: string,
		private userRepository: Repository<User>,
		private sessionRepository: Repository<Session>
	) {}

	async exec(request: RegisterUserUseCaseInput): Promise<RegisterUserUseCaseOutput> {
		let user = User.create({
			email: new Email(request.email),
			password: new Password(request.password),
			firstName: request.firstName,
			lastName: request.lastName,
		});

		if (await this.userRepository.exists({ email: user.email })) {
			throw new AppError('Email already in use', 404);
		}

		user = await this.userRepository.create(user);

		const payload = { sub: user.id!.value, name: user.fullName };
		const refreshToken = JWT.generate(payload, this.refreshSecretKey);
		const accessToken = JWT.generate(payload, this.accessSecretKey, { expiresIn: '5m' });

		await this.sessionRepository.create({
			userId: user.id!,
			refreshToken: refreshToken,
		});

		return {
			tokens: {
				access: accessToken.value,
				refresh: refreshToken.value,
			},
			user: { email: user.email.value, firstName: user.firstName, lastName: user.lastName },
		};
	}
}
