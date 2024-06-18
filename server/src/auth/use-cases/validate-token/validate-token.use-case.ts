import { AppError } from '../../../shared/classes/app-error';
import { UseCase } from '../../../shared/use-case';
import { JWT } from '../../domain/data-objects/jwt/jwt';
import { ValidateTokenUseCaseInput, ValidateTokenUseCaseOutput } from './validate-token.use-case-io';

export class ValidateTokenUseCase implements UseCase<ValidateTokenUseCaseInput, ValidateTokenUseCaseOutput> {
	constructor(private accessSecretKey: string) {}

	exec(input: ValidateTokenUseCaseInput) {
		try {
			const jwt = JWT.create(input.refreshToken);
			jwt.verify(this.accessSecretKey);
			const payload = jwt.payload;
			return { userId: payload!.sub, userFullName: payload!.name };
		} catch (e: unknown) {
			if (e instanceof AppError) throw new AppError(e.message, 401);
			else throw new AppError('Internal server error', 500);
		}
	}
}
