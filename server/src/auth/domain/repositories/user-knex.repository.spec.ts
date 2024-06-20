import knex from 'knex';
import { UserRepositorySpecBase } from './user.repository.spec-base';
import config from '../../../../knexfile';
import { UserKnexRepository } from './user-knex.repository';

describe('UserKnexRepository', () => {
	let repository: UserKnexRepository;
	const knexInstance = knex(config.test);

	beforeEach(async () => {
		repository = new UserKnexRepository(knexInstance);
		await knexInstance.table('users').del();
	});
	afterAll(async () => await knexInstance.destroy());

	test('create', async () => await UserRepositorySpecBase.create(repository));
	test('find by email', async () => await UserRepositorySpecBase.findByEmail(repository));
	test('find by email null', async () => await UserRepositorySpecBase.findByEmailNull(repository));
	test('find by id', async () => await UserRepositorySpecBase.findById(repository));
	test('find by id null', async () => await UserRepositorySpecBase.findByIdNull(repository));
});
