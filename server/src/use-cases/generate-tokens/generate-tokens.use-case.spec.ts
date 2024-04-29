import { GenerateTokensUseCase } from './generate-tokens.use-case';
import { GenerateTokensUseCaseInput } from './generate-tokens.use-case-io';

const getRequest = (replace?: Partial<GenerateTokensUseCaseInput>) =>
	({
		refreshToken: replace?.refreshToken,
		payload: {
			name: replace?.payload?.name ?? 'John Doe',
			sub: replace?.payload?.sub ?? 'f50b48e3-a0a0-48d7-94dd-27d487b37c89',
		},
	} as GenerateTokensUseCaseInput);

describe('GenerateTokensUseCase', () => {
	test('generate', () => {
		const useCase = new GenerateTokensUseCase('accessSecret', 'refreshSecret');
		const result = useCase.exec(getRequest());
		expect(result).toBeTruthy();
	});

	test('same refresh', () => {
		const useCase = new GenerateTokensUseCase('accessSecret', 'refreshSecret');

		const refreshToken =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
		const result = useCase.exec(getRequest({ refreshToken }));

		expect(result.refresh === refreshToken).toBe(true);
	});

	test('invalid userId', () => {
		const useCase = new GenerateTokensUseCase('accessSecret', 'refreshSecret');
		const payload = { sub: '123', name: '' };

		expect(() => useCase.exec(getRequest({ payload }))).toThrow();
	});

	test('invalid refreshToken', () => {
		const useCase = new GenerateTokensUseCase('accessSecret', 'refreshSecret');

		expect(() => useCase.exec(getRequest({ refreshToken: '123' }))).toThrow();
	});
});
