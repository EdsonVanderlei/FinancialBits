import { JWT } from '../../../data-objects/jwt/jwt';
import { UUID } from '../../../data-objects/uuid/uuid';
import { Session } from '../../../entities/session/session';
import { SessionInMemoryRepository } from './session-in-memory.repository';

describe('SessionInMemoryRepository', () => {
	let repository: SessionInMemoryRepository;
	const input = Session.create({
		userId: new UUID(),
		refreshToken: JWT.generate({ name: 'name', sub: 'sub' }, 'secretKey')
	});

	beforeEach(() => (repository = new SessionInMemoryRepository()));

	test('findAll', async () => {
		await repository.create(input);
		const result = await repository.findAll();

		expect(result).toContainEqual(input);
	});
	test('findAll where', async () => {
		const input2 = { ...input, id: new UUID() };
		await repository.create(input);
		await repository.create(input2);
		const result = await repository.findAll({ id: input2.id });

		expect(result).toContainEqual(input2);
		expect(result).not.toContainEqual(input);
	});
	test('findOne', async () => {
		await repository.create(input);
		const result = await repository.findOne({ id: input.id });

		expect(result).toEqual(input);
	});
	test('findOne null', async () => {
		const result = await repository.findOne({ id: input.id });

		expect(result).toEqual(null);
	});
	test('exists true', async () => {
		await repository.create(input);
		const result = await repository.exists({ id: input.id });

		expect(result).toBeTruthy();
	});
	test('exists false', async () => {
		const result = await repository.findOne({ id: input.id });

		expect(result).toBeFalsy();
	});
	test('create', async () => {
		const result = await repository.create(input);
		const quantity = (await repository.findAll()).length;

		expect(result).toEqual(input);
		expect(quantity).toEqual(1);
	});
	test('update', async () => {
		await repository.create(input);
		const result = await repository.update(input.id!, { ...input, userId: new UUID() });
		const quantity = (await repository.findAll()).length;

		expect(quantity).toEqual(1);
		expect(result?.userId).not.toEqual(input.userId);
		expect(result?.id).toEqual(input.id);
		expect(result?.refreshToken).toEqual(input.refreshToken);
		expect(result?.createdAt).toEqual(input.createdAt);
		expect(result?.updatedAt).toEqual(input.updatedAt);
	});
	test('update null', async () => {
		const result = await repository.update(input.id!, { ...input, userId: new UUID() });
		const quantity = (await repository.findAll()).length;

		expect(quantity).toEqual(0);
		expect(result).toEqual(null);
	});
	test('delete 1', async () => {
		await repository.create(input);
		const result = await repository.delete({ id: input.id });
		const quantity = (await repository.findAll()).length;

		expect(result.deleteCount).toEqual(1);
		expect(quantity).toEqual(0);
	});
	test('delete 0', async () => {
		await repository.create(input);
		const result = await repository.delete({ id: new UUID() });
		const quantity = (await repository.findAll()).length;

		expect(result.deleteCount).toEqual(0);
		expect(quantity).toEqual(1);
	});
});
