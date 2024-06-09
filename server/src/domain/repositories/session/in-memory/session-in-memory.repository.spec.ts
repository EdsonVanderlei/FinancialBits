import { JWT } from '../../../data-objects/jwt/jwt';
import { UUID } from '../../../data-objects/uuid/uuid';
import { Session } from '../../../entities/session/session';
import { SessionInMemoryRepository } from './session-in-memory.repository';

describe('SessionInMemoryRepository', () => {
	let repository: SessionInMemoryRepository;
	const userId = UUID.generate();
	const session = Session.create({ userId, refreshToken: JWT.generate({ userId, userFullName: 'John' }, 'secretKey') });
	beforeEach(() => (repository = new SessionInMemoryRepository()));

	test('create', async () => {
		const result = await repository.create(session);

		expect(result).toMatchObject(session);
	});
	test('find by user id', async () => {
		await repository.create(session);
		const result = await repository.findByUserId(session.userId);

		expect(result).toMatchObject(session);
	});
	test('find by user id null', async () => {
		const result = await repository.findByUserId(session.userId);

		expect(result).toEqual(null);
	});
	test('delete by user id', async () => {
		await repository.create(session);
		await repository.deleteByUserId(session.userId);
		const result = await repository.findByUserId(session.userId);

		expect(result).toEqual(null);
	});
});
