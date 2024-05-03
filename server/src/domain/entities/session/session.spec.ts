import { JWT } from '../../data-objects/jwt/jwt';
import { UUID } from '../../data-objects/uuid/uuid';
import { Session } from './session';

describe('Session', () => {
	let input: { id: string; userId: string; refreshToken: string };
	beforeAll(
		() =>
			(input = {
				id: '8e6d8ce1-f348-41c2-92d3-0775c7b4d7b3',
				userId: '31326db2-1337-46f2-89db-0b7437b82619',
				refreshToken:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
			})
	);

	test('create', () => {
		const session = Session.create({
			userId: new UUID(input.userId),
			refreshToken: new JWT(input.refreshToken),
		});

		expect(input.userId === session.userId.value).toBeTruthy();
		expect(input.refreshToken === session.refreshToken.value).toBeTruthy();
	});
	test('load', () => {
		const session = Session.load({
			id: new UUID(input.id),
			userId: new UUID(input.userId),
			refreshToken: new JWT(input.refreshToken),
			createdAt: 0
		});

		expect(input.id === session.id?.value).toBeTruthy();
		expect(input.userId === session.userId.value).toBeTruthy();
		expect(input.refreshToken === session.refreshToken.value).toBeTruthy();
	});
});
