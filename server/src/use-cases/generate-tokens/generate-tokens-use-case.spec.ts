import { GenerateTokensUseCase, GenerateTokensUseCaseRequest } from './generate-tokens-use-case';

const getRequest = (replace?: {
	refreshToken?: string;
	payload?: { userId?: string; userEmail?: string };
}) =>
	({
		refreshToken: replace?.refreshToken,
		payload: {
			userEmail: replace?.payload?.userEmail ?? 'test@test.com',
			userId: replace?.payload?.userId ?? 'f50b48e3-a0a0-48d7-94dd-27d487b37c89',
		},
	} as GenerateTokensUseCaseRequest);

describe('GenerateTokensUseCase tests', () => {
	test('generate', () => {
		const useCase = new GenerateTokensUseCase('accessSecret', 'refreshSecret');
		const result = useCase.exec(getRequest());
		expect(result.access !== result.refresh).toBe(true);
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

		expect(() => useCase.exec(getRequest({ payload: { userId: '123' } }))).toThrow({
			message: 'invalid user identifier',
		} as Error);
	});

	test('invalid userEmail', () => {
		const useCase = new GenerateTokensUseCase('accessSecret', 'refreshSecret');

		expect(() => useCase.exec(getRequest({ payload: { userEmail: 'www.test.com' } }))).toThrow({
			message: 'invalid user email',
		} as Error);
	});

	test('invalid refreshToken', () => {
		const useCase = new GenerateTokensUseCase('accessSecret', 'refreshSecret');

		expect(() => useCase.exec(getRequest({ refreshToken: '123' }))).toThrow({
			message: 'invalid refresh token',
		} as Error);
	});
});
