import { AppError } from '../../../shared/classes/app-error';
import { UseCase } from '../../../shared/use-case';
import { Session } from '../../classes/session';
import { Email } from '../../domain/data-objects/email/email';
import { UserRepository } from '../../domain/repositories/user.repository';
import { LoginUseCaseInput, LoginUseCaseOutput } from './login.use-case-io';

export class LoginUseCase implements UseCase<LoginUseCaseInput, LoginUseCaseOutput> {
	constructor(
		private userRepository: UserRepository,
		private secretKeys: { access: string; refresh: string },
	) {}

	async exec(request: LoginUseCaseInput) {
		const email = Email.create(request.email);

		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			throw new AppError('User not found', 404);
		}
		user.comparePassword(request.password);

		const session = new Session({ userId: user.id, userFullName: user.fullName }, this.secretKeys);

		return {
			tokens: session.asString,
			user: {
				id: user.id.value,
				email: user.email.value,
				firstName: user.firstName,
				lastName: user.lastName,
				fullName: user.fullName,
				...user.timestamps.value,
			},
		};
	}
}
