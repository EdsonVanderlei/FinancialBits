import { ServerError } from '../../core/server-error';
import { Session } from '../../entities/session';
import { SessionInMemoryRepository } from '../../repositories/session-in-memory-repository';
import { DeleteSessionUseCase } from './delete-session-use-case';

const getSession = (replace?: Partial<Session>) =>
	({
		id: '0831e8f6-9471-4c58-ad42-bce5a85bfcbc',
		userId: '01900c68-a2af-4fb7-8d5b-8739edcf307a',
		refreshToken:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
		...replace,
	} as Session);

describe('DeleteSessionUseCaseRequest tests', () => {
	test('delete by id', async () => {
		const repository = new SessionInMemoryRepository();
		const useCase = new DeleteSessionUseCase(repository);

		let session = getSession();
		session = await repository.create(session);

		const result = await useCase.exec({ id: session.id });
		expect(result).toEqual(session);
	});

	test('delete by userId', async () => {
		const repository = new SessionInMemoryRepository();
		const useCase = new DeleteSessionUseCase(repository);

		let session = getSession();
		session = await repository.create(session);

		const result = await useCase.exec({ userId: session.userId });
		expect(result).toEqual(session);
	});

	test('no parameters', async () => {
		const repository = new SessionInMemoryRepository();
		const useCase = new DeleteSessionUseCase(repository);

		useCase.exec({}).catch(e => {
			expect(e).toBeInstanceOf(ServerError);
			expect(e.code).toEqual(400);
			expect(e.message).toEqual('no parameters were provided');
		});
	});

	test('invalid id', async () => {
		const repository = new SessionInMemoryRepository();
		const useCase = new DeleteSessionUseCase(repository);

		useCase.exec({ id: '123' }).catch(e => {
			expect(e).toBeInstanceOf(ServerError);
			expect(e.code).toEqual(400);
			expect(e.message).toEqual('invalid identifier');
		});
	});

	test('invalid userId', async () => {
		const repository = new SessionInMemoryRepository();
		const useCase = new DeleteSessionUseCase(repository);

		useCase.exec({ userId: '123' }).catch(e => {
			expect(e).toBeInstanceOf(ServerError);
			expect(e.code).toEqual(400);
			expect(e.message).toEqual('invalid user identifier');
		});
	});

	test('session not found', async () => {
		const repository = new SessionInMemoryRepository();
		const useCase = new DeleteSessionUseCase(repository);

		useCase.exec({ id: getSession().id }).catch(e => {
			expect(e).toBeInstanceOf(ServerError);
			expect(e.code).toEqual(404);
			expect(e.message).toEqual('session not found');
		});
	});
});
