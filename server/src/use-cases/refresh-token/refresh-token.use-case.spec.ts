import { GenerateTokensUseCase } from '../generate-tokens/generate-tokens.use-case';
import { RefreshTokenUseCase } from './refresh-token.use-case';

describe('RefreshTokenUseCase', () => {
	test('exec', async () => {
		const accessSecret = 'accessSecret';
		const refreshSecret = 'refreshSecret';
		const generateUseCase = new GenerateTokensUseCase(accessSecret, refreshSecret);
		const useCase = new RefreshTokenUseCase(refreshSecret, generateUseCase);

		const { refresh } = generateUseCase.exec({
			payload: { sub: 'ccbc5c39-fefc-42f4-b6ba-4c6b97924ce7', name: 'John Doe' },
		});

		const result = await useCase.exec({ refreshToken: refresh });

		expect(result).toBeTruthy();
	});
});
