import { UUID } from '../../../../shared/domain/data-objects/uuid/uuid';
import { JWT } from '../../data-objects/jwt/jwt';
import { Session } from '../../entities/session/session';
import { SessionRepository } from './session.repository';

export const SessionRepositorySpecBase = {
	create: async (repository: SessionRepository) => {
		const userId = UUID.generate();
		const session = Session.create({ userId, refreshToken: JWT.generate({ userId, userFullName: 'John' }, 'secretKey') });
		const result = await repository.create(session);

		expect(result).toMatchObject(session);
	},
	findByUserId: async (repository: SessionRepository) => {
		const userId = UUID.generate();
		const session = Session.create({ userId, refreshToken: JWT.generate({ userId, userFullName: 'John' }, 'secretKey') });
		await repository.create(session);
		const result = await repository.findByUserId(session.userId);

		expect(result).toMatchObject(session);
	},
	findByUserIdNull: async (repository: SessionRepository) => {
		const userId = UUID.generate();
		const session = Session.create({ userId, refreshToken: JWT.generate({ userId, userFullName: 'John' }, 'secretKey') });
		const result = await repository.findByUserId(session.userId);

		expect(result).toEqual(null);
	},
	deleteByUserId: async (repository: SessionRepository) => {
		const userId = UUID.generate();
		const session = Session.create({ userId, refreshToken: JWT.generate({ userId, userFullName: 'John' }, 'secretKey') });
		await repository.create(session);
		await repository.deleteByUserId(session.userId);
		const result = await repository.findByUserId(session.userId);

		expect(result).toEqual(null);
	},
};
