import { AppError } from '../../../shared/classes/app-error';
import { UseCase } from '../../../shared/use-case';
import { JWT } from '../../domain/data-objects/jwt/jwt';
import { ValidateTokenUseCaseInput, ValidateTokenUseCaseOutput } from './validate-token.use-case-io';

export class ValidateTokenUseCase implements UseCase<ValidateTokenUseCaseInput, ValidateTokenUseCaseOutput> {
	constructor(private accessSecretKey: string) {}

	exec(input: ValidateTokenUseCaseInput) {
		if (!input.authorizationHeader) {
			throw new AppError('Authorization header is required', 401);
		}
		const refreshToken = input.authorizationHeader.split(' ')[1] ?? '';
		const token = JWT.create(refreshToken);
		token.verify(this.accessSecretKey);

		return token.payload!;
	}
}
