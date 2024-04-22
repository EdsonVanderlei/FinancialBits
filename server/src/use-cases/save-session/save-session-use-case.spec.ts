import { ServerError } from '../../core/server-error';
import { SessionInMemoryRepository } from '../../repositories/session-in-memory-repository';
import { SaveSessionUseCase } from './save-session-use-case';

const getParams = (replace?: { userId?: string; refreshToken?: string }) => ({
	userId: '77f95c2b-efae-408a-b877-2780768c5aaf',
	refreshToken:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
	...replace,
});

describe('SaveSessionUseCase tests', () => {
	test('exec', async () => {
		const repository = new SessionInMemoryRepository();
		const useCase = new SaveSessionUseCase(repository);

		const params = getParams();
		const result = await useCase.exec({
			userId: params.userId,
			refreshToken: params.refreshToken,
		});

		expect(result).toBeTruthy();
	});

	test('invalid userId', async () => {
		const repository = new SessionInMemoryRepository();
		const useCase = new SaveSessionUseCase(repository);
		const params = getParams({ userId: '77f95c2b-2780768c5aaf' });

		useCase.exec({ userId: params.userId, refreshToken: params.refreshToken }).catch(e => {
			expect(e).toBeInstanceOf(ServerError);
			expect(e.code).toEqual(400);
			expect(e.message).toEqual('invalid user identifier');
		});
	});

	test('invalid refreshToken', async () => {
		const repository = new SessionInMemoryRepository();
		const useCase = new SaveSessionUseCase(repository);
		const params = getParams({
			refreshToken:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.abc.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
		});

		useCase.exec({ userId: params.userId, refreshToken: params.refreshToken }).catch(e => {
			expect(e).toBeInstanceOf(ServerError);
			expect(e.code).toEqual(400);
			expect(e.message).toEqual('invalid refresh token');
		});
	});
});
