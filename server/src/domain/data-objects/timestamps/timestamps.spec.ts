import { Timestamps } from './timestamps';

describe('Timestamps', () => {
	test('asTimestamp', () => {
		const timestamps = new Timestamps();

		expect(timestamps.asTimestamp.createdAt).toBeDefined();
	});
});
