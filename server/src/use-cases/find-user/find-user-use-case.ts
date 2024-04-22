import { Repository } from '../../core/repository';
import { ServerError } from '../../core/server-error';
import { UseCase } from '../../core/use-case';
import { User } from '../../entities/user';
import { ValidationUtils } from '../../utils/validation/validation.utils';

export type FindUserUseCaseRequest = Partial<Pick<User, 'id' | 'email'>>;

export type FindUserUseCaseResponse = User;

export class FindUserUseCase implements UseCase {
	constructor(private userRepository: Repository<User>) {}

	async exec(request: FindUserUseCaseRequest): Promise<FindUserUseCaseResponse> {
		if (!request.id && !request.email) {
			throw new ServerError('no parameters were provided', 400);
		}

		if (request.id && !ValidationUtils.uuid(request.id)) {
			throw new ServerError('invalid user identifier', 400);
		}

		if (request.email && !ValidationUtils.email(request.email)) {
			throw new ServerError('invalid email', 400);
		}

		const user = await this.userRepository.findOne(request);

		if (!user) {
			throw new ServerError('user not found', 404);
		}
		return user;
	}
}
