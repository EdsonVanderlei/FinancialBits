import { Repository } from '../../core/repository';
import { ServerError } from '../../core/server-error';
import { UseCase } from '../../core/use-case';
import { User } from '../../entities/user';
import { PasswordUtils } from '../../utils/password/password.utils';
import { ValidationUtils } from '../../utils/validation/validation.utils';

export type CreateUserUseCaseRequest = Omit<User, 'id'>;

export type CreateUserUseCaseResponse = User;

export class CreateUserUseCase implements UseCase {
	constructor(private userRepository: Repository<User>) {}

	async exec(request: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
		if (!ValidationUtils.minLength(request.password, 4)) {
			throw new ServerError('password length must be greater than 4', 400);
		}

		if (!ValidationUtils.maxLength(request.password, 16)) {
			throw new ServerError('password length must be lower than 16', 400);
		}

		if (!ValidationUtils.email(request.email)) {
			throw new ServerError('invalid email', 400);
		}

		if (await this.userRepository.exists({ email: request.email })) {
			throw new ServerError('email already in use', 400);
		}

		const hashedPassword = await PasswordUtils.hash(request.password);
		const user = await this.userRepository.create({
			email: request.email,
			password: hashedPassword,
			firstName: request.firstName,
			lastName: request.lastName,
		});

		if (!user) {
			throw new ServerError("couldn't create the user", 500);
		}
		return user;
	}
}
