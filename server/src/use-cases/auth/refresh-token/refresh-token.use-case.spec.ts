import { JWT } from '../../../domain/data-objects/jwt/jwt';
import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { AppError } from '../../../shared/classes/app-error';
import { RefreshTokenUseCase } from './refresh-token.use-case';

describe('RefreshTokenUseCase', () => {
	test('exec', async () => {
		const secretKeys = { access: 'accessSecret', refresh: 'refreshSecret' };
		const useCase = new RefreshTokenUseCase(secretKeys);
		const payload = { userId: UUID.generate(), userFullName: 'John Doe' };

		const refreshToken = JWT.generate(payload, secretKeys.refresh).value;
		const result = await useCase.exec({ refreshToken });

		expect(result).toBeTruthy();
	});
	test('invalid payload', async () => {
		const secretKeys = { access: 'accessSecret', refresh: 'refreshSecret' };
		const useCase = new RefreshTokenUseCase(secretKeys);
		const payload = { userId: UUID.generate() } as any;

		const refreshToken = JWT.generate(payload, secretKeys.refresh).value;

		await useCase.exec({ refreshToken }).catch(e => {
			expect(e).toBeInstanceOf(AppError);
			expect(e.statusCode).toEqual(400);
			expect(e.message).toEqual('Invalid token');
		});
	});
});
