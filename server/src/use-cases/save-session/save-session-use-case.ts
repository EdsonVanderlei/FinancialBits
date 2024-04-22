import { Repository } from '../../core/repository';
import { ServerError } from '../../core/server-error';
import { UseCase } from '../../core/use-case';
import { Session } from '../../entities/session';
import { ValidationUtils } from '../../utils/validation/validation.utils';

export type SaveSessionUseCaseRequest = Omit<Session, 'id'>;

export type SaveSessionUseCaseResponse = Session;

export class SaveSessionUseCase implements UseCase {
	constructor(private sessionRepository: Repository<Session>) {}

	async exec(request: SaveSessionUseCaseRequest): Promise<SaveSessionUseCaseResponse> {
		if (!ValidationUtils.jwt(request.refreshToken)) {
			throw new ServerError('invalid refresh token', 400);
		}

		if (!ValidationUtils.uuid(request.userId)) {
			throw new ServerError('invalid user identifier', 400);
		}

		let session = await this.sessionRepository.findOne({
			userId: request.userId,
		});

		if (!session)
			session = await this.sessionRepository.create({
				userId: request.userId,
				refreshToken: request.refreshToken,
			});
		else
			session = await this.sessionRepository.update({
				id: session.id,
				userId: session.userId,
				refreshToken: request.refreshToken,
			});

		if (!session) {
			throw new ServerError("couldn't save the session", 500);
		}
		return session;
	}
}
