import { Repository } from '../../core/repository';
import { ServerError } from '../../core/server-error';
import { UseCase } from '../../core/use-case';
import { Session } from '../../entities/session';
import { ValidationUtils } from '../../utils/validation/validation.utils';

export type FindSessionUseCaseRequest = Partial<Session>;

export type FindSessionUseCaseResponse = Session;

export class FindSessionUseCase implements UseCase {
	constructor(private sessionRepository: Repository<Session>) {}

	async exec(request: FindSessionUseCaseRequest): Promise<FindSessionUseCaseResponse> {
		if (!request.id && !request.userId && !request.refreshToken) {
			throw new ServerError('no parameters were provided', 400);
		}

		if (request.id && !ValidationUtils.uuid(request.id)) {
			throw new ServerError('invalid session identifier', 400);
		}

		if (request.userId && !ValidationUtils.uuid(request.userId)) {
			throw new ServerError('invalid user identifier', 400);
		}

		if (request.refreshToken && !ValidationUtils.jwt(request.refreshToken)) {
			throw new ServerError('invalid refresh token', 400);
		}

		const Session = await this.sessionRepository.findOne(request);

		if (!Session) {
			throw new ServerError('session not found', 404);
		}
		return Session;
	}
}
