import { JwtPayload } from 'jsonwebtoken';
import { JWT } from '../../../domain/data-objects/jwt/jwt';
import { AppError } from '../../../shared/classes/app-error';
import { ValidateTokenUseCaseInput, ValidateTokenUseCaseOutput } from './validate-token.use-case-io';

export class ValidateTokenUseCase {
	constructor(private accessSecretKey: string) {}

	exec(request: ValidateTokenUseCaseInput): ValidateTokenUseCaseOutput {
		const accessToken = new JWT(request.accessToken);

		let payload: JwtPayload | null;
		try {
			payload = accessToken.verify(this.accessSecretKey);
			if (!payload || !payload.sub) throw new Error('');
		} catch (e: any) {
			throw new AppError(e.message ?? 'Invalid access token', 401);
		}
		return { userFullname: payload.name, userId: payload.sub };
	}
}
