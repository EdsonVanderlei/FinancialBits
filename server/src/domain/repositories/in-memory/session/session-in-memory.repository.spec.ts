import { UUID } from '../../../data-objects/uuid/uuid';
import { Session } from '../../../entities/session/session';
import { LoadSessionProps } from '../../../types/session/load-session-props';
import { SessionInMemoryRepository } from './session-in-memory.repository';

const getSession = (replace?: Partial<LoadSessionProps>) =>
	({
		userId: '9fa68838-b06b-4c7a-b577-b59d059c2775',
		refreshToken:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
		...replace,
	} as LoadSessionProps);

describe('SessionInMemoryRepository', () => {
	let repository: SessionInMemoryRepository;

	beforeEach(() => {
		repository = new SessionInMemoryRepository();
	});

	test('findAll', async () => {
		const session = await repository.create(getSession());

		expect(await repository.findAll()).toContainEqual(session);
	});

	test('findById', async () => {
		const session = await repository.create(getSession());

		expect(await repository.findOne({ id: session.id })).toEqual(session);
		expect(await repository.findOne({ id: new UUID('', false) })).toBeFalsy();
	});

	test('create', async () => {
		const session = await repository.create(getSession());

		expect(session).toBeInstanceOf(Session);
	});

	test('update', async () => {
		const session = await repository.create(getSession());

		const newsession = await repository.update(
			getSession({
				userId: new UUID('9a5b560b-5035-45b2-935e-0422fb5e7059'),
				id: session.id,
			})
		);

		expect(newsession?.userId.value).toEqual('9a5b560b-5035-45b2-935e-0422fb5e7059');
		expect(newsession?.id?.value === session.id?.value).toBe(true);
		expect(await repository.findAll()).not.toContainEqual(session);
	});

	test('delete', async () => {
		const session = await repository.create(getSession());
		const { deleteCount } = await repository.delete({ id: session.id });

		expect(deleteCount).toEqual(1);
		expect(await repository.findAll()).not.toContainEqual(session);
	});
});
