import { JWT } from '../../../domain/data-objects/jwt/jwt';
import { AppError } from '../../../shared/classes/app-error';
import { ValidateTokenUseCase } from './validate-token.use-case';

describe('ValidateTokenUseCase', () => {
	let useCase: ValidateTokenUseCase;
	beforeAll(() => (useCase = new ValidateTokenUseCase('accessSecret')));

	test('valid token', () => {
		const token = JWT.generate({ name: 'name', sub: 'sub' }, 'accessSecret');
		const result = useCase.exec({ accessToken: token.value });

		expect(result).toBeDefined();
		expect(result.userId).toEqual('sub');
		expect(result.userFullname).toEqual('name');
	});
	test('invalid token', () => {
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZSIsInN1YiI6InN1YiIsImlhdCI6MTcxNDc4NTQ5MSwiZXhwIjoxNzE0Nzg1NTAxfQ.v5HRaoqXjtNC2_GIzXEIp8HYNQLOQBzjg5b8XgSfmLk';

		expect(() => useCase.exec({ accessToken: token })).toThrow({
			statusCode: 401,
			message: 'Token expired',
		} as AppError);
	});
	test('not a token', () => {
		const token = 'token';

		expect(() => useCase.exec({ accessToken: token })).toThrow({
			statusCode: 401,
			message: 'Invalid token',
		} as AppError);
	});
});
