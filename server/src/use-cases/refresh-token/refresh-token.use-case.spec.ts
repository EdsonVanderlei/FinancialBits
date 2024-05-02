import { JWT } from '../../domain/data-objects/jwt/jwt';
import { RefreshTokenUseCase } from './refresh-token.use-case';

describe('RefreshTokenUseCase', () => {
	test('exec', async () => {
		const accessSecret = 'accessSecret';
		const refreshSecret = 'refreshSecret';
		const useCase = new RefreshTokenUseCase(accessSecret, refreshSecret);

		const refreshToken = JWT.generate({ sub: 'ccbc5c39-fefc-42f4-b6ba-4c6b97924ce7', name: 'John Doe' }, refreshSecret);
		const result = await useCase.exec({ refreshToken: refreshToken.value });

		expect(result).toBeTruthy();
	});
});
