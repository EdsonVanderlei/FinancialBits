import { JWT } from '../../../domain/data-objects/jwt/jwt';
import { AppError } from '../../../shared/classes/app-error';
import { ValidateTokenUseCaseInput, ValidateTokenUseCaseOutput } from './validate-token.use-case-io';

export class ValidateTokenUseCase {
	constructor(private accessSecretKey: string) {}

	exec(input: ValidateTokenUseCaseInput): ValidateTokenUseCaseOutput {
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
