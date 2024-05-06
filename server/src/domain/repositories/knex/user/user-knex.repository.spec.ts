import knex from 'knex';
import { UserKnexRespository } from './user-knex.repository';
import { User } from '../../../entities/user/user';
import { Email } from '../../../data-objects/email/email';
import { Password } from '../../../data-objects/password/password';
import * as knexFileConfig from '../../../../../knexfile';

describe('UserKnexRespository', () => {
	const knexConfig = knexFileConfig as any;
	let knexInstance: knex.Knex<any, unknown[]>;
	let userRespository: UserKnexRespository;
	const user = User.create({
		email: new Email('user@test.com'),
		password: new Password('abc123'),
		firstName: 'John',
	});

	beforeAll(() => {
		knexInstance = knex(knexConfig.development_test);
		userRespository = new UserKnexRespository(knexInstance, 'users');
	});
	beforeEach(async () => await knexInstance.table('users').del());
	afterAll(async () => await knexInstance.destroy());

	test('findAll', async () => {
		await userRespository.create(user);
		const result = await userRespository.findAll();

		expect(result.length).toEqual(1);
	});

	test('findOne', async () => {
		await userRespository.create(user);
		const result = await userRespository.findOne({ email: user.email });

		expect(result?.id.value).toEqual(user.id.value);
	});

	test('exists', async () => {
		await userRespository.create(user);
		const result = await userRespository.exists({ email: user.email });

		expect(result).toBeTruthy();
	});

	test('exists false', async () => {
		const result = await userRespository.exists({ email: user.email });

		expect(result).toBeFalsy();
	});

	test('create', async () => {
		const result = await userRespository.create(user);
		expect(result).toBeDefined();
	});

	test('update', async () => {
		await userRespository.create(user);
		const firstName = 'Peter';
		const result = await userRespository.update(user.id!, User.load({ ...user, id: user.id!, firstName }));

		expect(result).toBeDefined();
		expect(result?.firstName).toEqual(firstName);
		expect(result?.id.value).toEqual(user.id.value);
	});

	test('delete', async () => {
		await userRespository.create(user);
		const result = await userRespository.delete({ id: user.id });

		expect(result.deleteCount).toEqual(1);
	});

	test('delete false', async () => {
		const result = await userRespository.delete({ id: user.id });

		expect(result.deleteCount).toEqual(0);
	});
});
