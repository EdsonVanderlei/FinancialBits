import { JWT } from '../../../domain/data-objects/jwt/jwt';
import { AppError } from '../../../shared/classes/app-error';
import { RefreshTokenUseCase } from './refresh-token.use-case';

describe('RefreshTokenUseCase', () => {
	test('exec', async () => {
		const secretKeys = { access: 'accessSecret', refresh: 'refreshSecret' };
		const useCase = new RefreshTokenUseCase(secretKeys);
		const payload = { sub: 'ccbc5c39-fefc-42f4-b6ba-4c6b97924ce7', name: 'John Doe' };

		const refreshToken = JWT.create(payload, secretKeys.refresh).value;
		const result = await useCase.exec({ refreshToken });

		expect(result).toBeTruthy();
	});
	test('invalid payload', async () => {
		const secretKeys = { access: 'accessSecret', refresh: 'refreshSecret' };
		const useCase = new RefreshTokenUseCase(secretKeys);
		const refreshToken = JWT.create({}, secretKeys.refresh).value;

		await useCase.exec({ refreshToken }).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Invalid token');
		});
	});
});
