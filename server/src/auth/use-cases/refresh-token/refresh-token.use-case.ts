import { AppError } from '../../../shared/classes/app-error';
import { UUID } from '../../../shared/domain/data-objects/uuid/uuid';
import { UseCase } from '../../../shared/use-case';
import { Session } from '../../classes/session';
import { JWT } from '../../domain/data-objects/jwt/jwt';
import { UserRepository } from '../../domain/repositories/user.repository';
import { RefreshTokenUseCaseInput, RefreshTokenUseCaseOutput } from './refresh-token.use-case-io';

export class RefreshTokenUseCase implements UseCase<RefreshTokenUseCaseInput, RefreshTokenUseCaseOutput> {
	constructor(
		private userRepository: UserRepository,
		private secretKeys: { access: string; refresh: string },
	) {}

	async exec(request: RefreshTokenUseCaseInput) {
		const refreshToken = JWT.create(request.refreshToken);
		refreshToken.verify(this.secretKeys.refresh);

		const userId = UUID.create(refreshToken.payload!.sub);
		const user = await this.userRepository.findById(userId);
		if (!user) {
			throw new AppError('User not found', 404);
		}

		const sessionToken = new Session({ userId, userFullName: refreshToken.payload!.name }, this.secretKeys);
		return sessionToken.asString;
	}
}
