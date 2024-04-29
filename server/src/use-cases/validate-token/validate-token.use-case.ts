import { Session } from 'inspector';
import { Repository } from '../../domain/repositories/repository';
import { UseCase } from '../../core/interfaces/use-case';
import { SessionService } from '../../services/session.service';
import { TokenUtils } from '../../shared/utils/token/token.utils';
import { AppError } from '../../shared/classes/app-error';
import { ValidationUtils } from '../../shared/utils/validation/validation.utils';

export type ValidateTokenUseCaseRequest = { accessToken: string };

export type ValidateTokenUseCaseResponse = { userEmail: string; userId: string };

export class ValidateTokenUseCase implements UseCase {
	constructor(private secretKey: string, private sessionSevice: SessionService) {}

	exec(request: ValidateTokenUseCaseRequest): Promise<ValidateTokenUseCaseResponse> {
		if (!ValidationUtils.jwt(request.accessToken)) {
			throw new AppError('invalid access token', 400);
		}

		const token = TokenUtils.decode(request.accessToken);

		if (token === null || !!token.exp) {
			throw new AppError('invalid access token', 400);
		}

		const { userEmail, userId } = token;
	}
}
