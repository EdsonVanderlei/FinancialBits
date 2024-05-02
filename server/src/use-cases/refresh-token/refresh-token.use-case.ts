import { JWT } from '../../domain/data-objects/jwt/jwt';
import { RefreshTokenUseCaseInput, RefreshTokenUseCaseOutput } from './refresh-token.use-case-io';

export class RefreshTokenUseCase {
	constructor(private accessSecretKey: string, private refreshSecretKey: string) {}

	async exec(request: RefreshTokenUseCaseInput): Promise<RefreshTokenUseCaseOutput> {
		const refreshToken = new JWT(request.refreshToken);

		refreshToken.verify(this.refreshSecretKey);

		const payload = refreshToken.payload;
		const accessToken = JWT.generate({ sub: payload!.sub!, name: payload!.name }, this.accessSecretKey, {
			expiresIn: '10m',
		});

		return {
			refresh: refreshToken.value,
			access: accessToken.value,
		};
	}
}
