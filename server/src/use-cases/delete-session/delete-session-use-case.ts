import { Repository } from '../../core/repository';
import { ServerError } from '../../core/server-error';
import { UseCase } from '../../core/use-case';
import { Session } from '../../entities/session';
import { ValidationUtils } from '../../utils/validation/validation.utils';

export type DeleteSessionUseCaseRequest = Partial<Pick<Session, 'id' | 'userId'>>;

export type DeleteSessionUseCaseResponse = Session;

export class DeleteSessionUseCase implements UseCase {
	constructor(private sessionRepository: Repository<Session>) {}

	async exec(request: DeleteSessionUseCaseRequest): Promise<DeleteSessionUseCaseResponse> {
		if (!request.id && !request.userId) {
			throw new ServerError('no parameters were provided', 400);
		}

		if (request.id && !ValidationUtils.uuid(request.id)) {
			throw new ServerError('invalid identifier', 400);
		}

		if (request.userId && !ValidationUtils.uuid(request.userId)) {
			throw new ServerError('invalid user identifier', 400);
		}

		const session = await this.sessionRepository.delete(request);

		if (!session) {
			throw new ServerError('session not found', 404);
		}
		return session;
	}
}
