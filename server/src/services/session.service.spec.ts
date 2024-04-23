import { ServerError } from '../core/server-error';
import { Session } from '../entities/session';
import { SessionInMemoryRepository } from '../repositories/session-in-memory.repository';
import { SessionService } from './session.service';

const getSession = (replace?: Partial<Session>) =>
	({
		id: 'ae9e4476-f75f-4349-894a-40b6ddc3a5bb',
		refreshToken:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
		userId: 'f8ce95c2-26a4-43f0-8fd8-fb48e3cfab2b',
		...replace,
	} as Session);

describe('SessionService', () => {
	describe('findOne', () => {
		test('find by id', async () => {
			const repository = new SessionInMemoryRepository();
			const service = new SessionService(repository);
			let session = getSession();
			session = await repository.create(session);

			const result = await service.findOne({ id: session.id });

			expect(result).toEqual(session);
		});
		test('find by userId', async () => {
			const repository = new SessionInMemoryRepository();
			const service = new SessionService(repository);
			let session = getSession();
			session = await repository.create(session);

			const result = await service.findOne({ userId: session.userId });

			expect(result).toEqual(session);
		});
		test('find by refreshToken', async () => {
			const repository = new SessionInMemoryRepository();
			const service = new SessionService(repository);
			let session = getSession();
			session = await repository.create(session);

			const result = await service.findOne({ refreshToken: session.refreshToken });

			expect(result).toEqual(session);
		});
		test('no parameters', async () => {
			const repository = new SessionInMemoryRepository();
			const service = new SessionService(repository);

			service.findOne({}).catch(e => {
				expect(e).toBeInstanceOf(ServerError);
				expect(e.code).toEqual(400);
				expect(e.message).toEqual('no parameters were provided');
			});
		});
		test('invalid id', async () => {
			const repository = new SessionInMemoryRepository();
			const service = new SessionService(repository);

			service.findOne({ id: '123' }).catch(e => {
				expect(e).toBeInstanceOf(ServerError);
				expect(e.code).toEqual(400);
				expect(e.message).toEqual('invalid session identifier');
			});
		});
		test('invalid userId', async () => {
			const repository = new SessionInMemoryRepository();
			const service = new SessionService(repository);

			service.findOne({ userId: '123' }).catch(e => {
				expect(e).toBeInstanceOf(ServerError);
				expect(e.code).toEqual(400);
				expect(e.message).toEqual('invalid user identifier');
			});
		});
		test('invalid refreshToken', async () => {
			const repository = new SessionInMemoryRepository();
			const service = new SessionService(repository);

			service.findOne({ refreshToken: '123' }).catch(e => {
				expect(e).toBeInstanceOf(ServerError);
				expect(e.code).toEqual(400);
				expect(e.message).toEqual('invalid refresh token');
			});
		});
		test('not found', async () => {
			const repository = new SessionInMemoryRepository();
			const service = new SessionService(repository);
			const session = getSession();

			service.findOne({ id: session.id }).catch(e => {
				expect(e).toBeInstanceOf(ServerError);
				expect(e.code).toEqual(404);
				expect(e.message).toEqual('session not found');
			});
		});
	});
	describe('save', () => {
		test('create', async () => {
			const repository = new SessionInMemoryRepository();
			const service = new SessionService(repository);
			const session = getSession();

			const result = await service.save(session);

			expect(result).toBeTruthy();
		});
		test('update', async () => {
			const repository = new SessionInMemoryRepository();
			const service = new SessionService(repository);
			let session = getSession();
			session = await repository.create(session);

			const result = await service.save({
				...session,
				refreshToken:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.dio0q16DFIMPY2C5FDxVIfqABO7L1Fbx3zKSU4J2RK8',
			});

			expect(result).toBeTruthy();
			expect(result.refreshToken !== session.refreshToken).toBe(true);
		});
		test('not found', async () => {
			const repository = new SessionInMemoryRepository();
			const service = new SessionService(repository);
			const session = getSession({ id: 'b709e202-bc62-4e53-85c5-674cc66c71fb' });

			service.save(session).catch(err => {
				expect(err).toBeInstanceOf(ServerError);
				expect(err.code).toBe(404);
				expect(err.message).toEqual('session not found');
			});
		});
		test('invalid refreshToken', async () => {
			const repository = new SessionInMemoryRepository();
			const service = new SessionService(repository);
			const session = getSession({
				refreshToken:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dio0q16DFIMPY2C5FDxVIfqABO7L1Fbx3zKSU4J2RK8',
			});

			service.save(session).catch(err => {
				expect(err).toBeInstanceOf(ServerError);
				expect(err.code).toBe(400);
				expect(err.message).toEqual('invalid refresh token');
			});
		});
		test('invalid userId', async () => {
			const repository = new SessionInMemoryRepository();
			const service = new SessionService(repository);
			const session = getSession({
				userId: '123',
			});

			service.save(session).catch(err => {
				expect(err).toBeInstanceOf(ServerError);
				expect(err.code).toBe(400);
				expect(err.message).toEqual('invalid user identifier');
			});
		});
	});
	describe('delete', () => {
		test('delete by id', async () => {
			const repository = new SessionInMemoryRepository();
			const service = new SessionService(repository);

			let session = getSession();
			session = await repository.create(session);

			const result = await service.delete({ id: session.id });
			expect(result).toEqual(session);
		});
		test('delete by userId', async () => {
			const repository = new SessionInMemoryRepository();
			const service = new SessionService(repository);

			let session = getSession();
			session = await repository.create(session);

			const result = await service.delete({ userId: session.userId });
			expect(result).toEqual(session);
		});
		test('no parameters', async () => {
			const repository = new SessionInMemoryRepository();
			const service = new SessionService(repository);

			service.delete({}).catch(e => {
				expect(e).toBeInstanceOf(ServerError);
				expect(e.code).toEqual(400);
				expect(e.message).toEqual('no parameters were provided');
			});
		});
		test('invalid id', async () => {
			const repository = new SessionInMemoryRepository();
			const service = new SessionService(repository);

			service.delete({ id: '123' }).catch(e => {
				expect(e).toBeInstanceOf(ServerError);
				expect(e.code).toEqual(400);
				expect(e.message).toEqual('invalid identifier');
			});
		});
		test('invalid userId', async () => {
			const repository = new SessionInMemoryRepository();
			const service = new SessionService(repository);

			service.delete({ userId: '123' }).catch(e => {
				expect(e).toBeInstanceOf(ServerError);
				expect(e.code).toEqual(400);
				expect(e.message).toEqual('invalid user identifier');
			});
		});
		test('session not found', async () => {
			const repository = new SessionInMemoryRepository();
			const service = new SessionService(repository);

			service.delete({ id: getSession().id }).catch(e => {
				expect(e).toBeInstanceOf(ServerError);
				expect(e.code).toEqual(404);
				expect(e.message).toEqual('session not found');
			});
		});
	});
});
