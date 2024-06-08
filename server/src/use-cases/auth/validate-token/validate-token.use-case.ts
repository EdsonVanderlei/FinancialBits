import { JWT } from '../../../domain/data-objects/jwt/jwt';
import { AppError } from '../../../shared/classes/app-error';
import { ValidateTokenUseCaseInput, ValidateTokenUseCaseOutput } from './validate-token.use-case-io';

export class ValidateTokenUseCase {
	constructor(private accessSecretKey: string) {}

	exec(request: ValidateTokenUseCaseInput): ValidateTokenUseCaseOutput {
		try {
			const token = request.authorizationHeader.split(' ')[1] ?? '';
			const jwt = new JWT(token);
			jwt.validate();
			const payload = jwt.verify(this.accessSecretKey);
			if (!payload.name || !payload.sub) throw new Error('Invalid token payload');
			return { userId: payload.sub, userFullname: payload.name };
		} catch (e: any) {
			throw new AppError(e.message, 401);
		}
	}
}
