import { PasswordUtils } from './password.utils';

describe('PasswordUtils', () => {
	test('hash', async () => {
		const password = 'abc123';
		const hashed = PasswordUtils.hash(password);
		expect(password === hashed).toBe(false);
	});

	test('compare valid', () => {
		const password = 'abc123';
		const hashed = PasswordUtils.hash(password);

		const result = PasswordUtils.compare(password, hashed);
		expect(result).toBe(true);
	});

	test('compare invalid', () => {
		const password = 'abc123';
		const hashed = PasswordUtils.hash('abcd1234');

		const result = PasswordUtils.compare(password, hashed);
		expect(result).toBe(false);
	});
});
