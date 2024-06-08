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

	test('create', () => {
		const session = Session.create({
			userId: new UUID(input.userId),
			refreshToken: new JWT(input.refreshToken),
		});

		expect(input.userId).toEqual(session.userId.value);
		expect(input.refreshToken).toEqual(session.refreshToken.value);
	});
	test('load', () => {
		const session = Session.load({
			id: new UUID(input.id),
			userId: new UUID(input.userId),
			refreshToken: new JWT(input.refreshToken),
			timestamps: new Timestamps(input.createdAt),
		});

		expect(input.id).toEqual(session.id.value);
		expect(input.userId).toEqual(session.userId.value);
		expect(input.refreshToken).toEqual(session.refreshToken.value);
		expect(input.createdAt).toEqual(session.timestamps.value.createdAt);
	});
});
