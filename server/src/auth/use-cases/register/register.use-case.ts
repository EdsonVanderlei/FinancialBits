import { AppError } from '../../../shared/classes/app-error';
import { Validator } from '../../../shared/domain/validator';
import { UseCase } from '../../../shared/use-case';
import { Session } from '../../classes/session';
import { Email } from '../../domain/data-objects/email/email';
import { Password } from '../../domain/data-objects/password/password';
import { User } from '../../domain/entities/user';
import { UserRepository } from '../../domain/repositories/user.repository';
import { RegisterUseCaseInput, RegisterUseCaseOutput } from './register.use-case-io';

export class RegisterUseCase implements UseCase<RegisterUseCaseInput, RegisterUseCaseOutput> {
	constructor(
		private userRepository: UserRepository,
		private createUserValidator: Validator<User>,
		private secretKeys: { access: string; refresh: string },
	) {}

	async exec(request: RegisterUseCaseInput) {
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

		const saved = await this.userRepository.create(user);
		if (!saved) {
			throw new AppError("Couldn't save the user", 500);
		}
		const session = new Session({ userId: user.id, userFullName: user.fullName }, this.secretKeys);

		return {
			tokens: session.asString,
			user: {
				id: user.id.value,
				email: user.email.value,
				firstName: user.firstName,
				lastName: user.lastName,
				...user.timestamps.value,
			},
		};
	}
}
