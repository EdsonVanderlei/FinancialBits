import { UUID } from '../../../domain/data-objects/uuid/uuid';
import { SessionInMemoryRepository } from '../../../domain/repositories/session/in-memory/session-in-memory.repository';
import { LogoutUseCase } from './logout.use-case';

describe('LogoutUserUseCase', () => {
	test('exec', async () => {
		const sessionRepository = new SessionInMemoryRepository();
		const useCase = new LogoutUseCase(sessionRepository);

		const userId = UUID.generate();
		await useCase.exec({ userId: userId.value });

		expect(true).toBeTruthy();
	});
});
