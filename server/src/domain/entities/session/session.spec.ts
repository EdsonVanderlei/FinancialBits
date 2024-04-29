import { JWT } from '../../data-objects/jwt/jwt';
import { UUID } from '../../data-objects/uuid/uuid';
import { Session } from './session';

describe('Session', () => {
	test('create', () => {
		const input = {
			userId: '31326db2-1337-46f2-89db-0b7437b82619',
			refreshToken:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
		};

		const session = Session.create(input.userId, input.refreshToken);

		expect(input.userId === session.userId.value).toBeTruthy();
		expect(input.refreshToken === session.refreshToken.value).toBeTruthy();
	});
	test('restore', () => {
		const input = {
			id: '8e6d8ce1-f348-41c2-92d3-0775c7b4d7b3',
			userId: '31326db2-1337-46f2-89db-0b7437b82619',
			refreshToken:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
		};

		const session = Session.restore(
			new UUID(input.id, false),
			new UUID(input.userId, false),
			new JWT(input.refreshToken, false)
		);

		expect(input.id === session.id?.value).toBeTruthy();
		expect(input.userId === session.userId.value).toBeTruthy();
		expect(input.refreshToken === session.refreshToken.value).toBeTruthy();
	});
});
