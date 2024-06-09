import { JWT } from '../../data-objects/jwt/jwt';
import { Timestamps } from '../../data-objects/timestamps/timestamps';
import { UUID } from '../../data-objects/uuid/uuid';
import { Session } from './session';

describe('Session', () => {
	const input = {
		id: '8e6d8ce1-f348-41c2-92d3-0775c7b4d7b3',
		userId: '31326db2-1337-46f2-89db-0b7437b82619',
		refreshToken:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
		createdAt: new Date(),
	};

	test('Create', () => {
		const session = Session.create({
			userId: UUID.create(input.userId),
			refreshToken: JWT.create(input.refreshToken),
		});

		expect(session.id).toBeDefined();
		expect(session.userId.value).toEqual(input.userId);
		expect(session.refreshToken.value).toEqual(input.refreshToken);
		expect(session.timestamps).toBeDefined();
	});
	test('Load', () => {
		const session = Session.load({
			id: UUID.create(input.id),
			userId: UUID.create(input.userId),
			refreshToken: JWT.create(input.refreshToken),
			timestamps: Timestamps.create({ createdAt: input.createdAt }),
		});

		expect(session.id.value).toEqual(input.id);
		expect(session.userId.value).toEqual(input.userId);
		expect(session.refreshToken.value).toEqual(input.refreshToken);
		expect(session.timestamps.value.createdAt.getTime()).toEqual(input.createdAt.getTime());
	});
});
