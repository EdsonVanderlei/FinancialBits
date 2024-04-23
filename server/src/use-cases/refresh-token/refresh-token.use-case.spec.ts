import { GenerateTokensUseCase } from '../generate-tokens/generate-tokens.use-case';
import { RefreshTokenUseCase } from './refresh-token.use-case';

describe('RefreshTokenUseCase', () => {
	test('exec', async () => {
		const accessSecret = 'accessSecret';
		const refreshSecret = 'refreshSecret';
		const generateUseCase = new GenerateTokensUseCase(accessSecret, refreshSecret);
		const useCase = new RefreshTokenUseCase(refreshSecret, generateUseCase);

		const refreshToken = generateUseCase.exec({
			payload: { userId: 'ccbc5c39-fefc-42f4-b6ba-4c6b97924ce7', userEmail: 'teste@test.com' },
		}).refresh;

		const result = await useCase.exec({ refreshToken });

		expect(result).toBeTruthy();
	});
});
