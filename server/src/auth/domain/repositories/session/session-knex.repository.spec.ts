import knex from 'knex';
import config from '../../../../../knexfile';
import { SessionKnexRepository } from './session-knex.repository';
import { SessionRepositorySpecBase } from './session.repository.spec-base';

describe('SessionKnexRepository', () => {
	let repository: SessionKnexRepository;
	const knexInstance = knex(config.test);

	beforeEach(async () => {
		repository = new SessionKnexRepository(knexInstance);
		await knexInstance.table('users').del();
	});
	afterAll(async () => await knexInstance.destroy());

	test('create', async () => SessionRepositorySpecBase.create(repository));
	test('find by user id', async () => SessionRepositorySpecBase.findByUserId(repository));
	test('find by user id null', async () => SessionRepositorySpecBase.findByUserIdNull(repository));
	test('delete by user id', async () => SessionRepositorySpecBase.deleteByUserId(repository));
});
