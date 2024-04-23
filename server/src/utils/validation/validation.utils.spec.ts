import { ValidationUtils } from './validation.utils';

describe('ValidationUtils', () => {
	test('valid email', () => {
		const email = 'test@test.com';
		expect(ValidationUtils.email(email)).toBe(true);
	});
	test('invalid email', () => {
		const email = 'test@.com';
		expect(ValidationUtils.email(email)).toBe(false);
	});

	test('valid uuid', () => {
		const uuid = 'eb269a09-be09-4cf5-8a6f-34d8981e2460';
		expect(ValidationUtils.uuid(uuid)).toBe(true);
	});
	test('invalid uuid', () => {
		const uuid = 'abc123';
		expect(ValidationUtils.uuid(uuid)).toBe(false);
	});

	test('valid jwt', () => {
		const jwt =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
		expect(ValidationUtils.jwt(jwt)).toBe(true);
	});
	test('invalid jwt', () => {
		const jwt = 'abc123';
		expect(ValidationUtils.jwt(jwt)).toBe(false);
	});

	test('valid minLength exclusive', () => {
		const value = 'abc';
		const min = 2;
		expect(ValidationUtils.minLength(value, min)).toBe(true);
	});
	test('invalid minLength exclusive', () => {
		const value = 'ab';
		const min = 2;
		expect(ValidationUtils.minLength(value, min)).toBe(false);
	});

	test('valid maxLength exclusive', () => {
		const value = 'abc123';
		const max = 7;
		expect(ValidationUtils.maxLength(value, max)).toBe(true);
	});
	test('invalid maxLength exclusive', () => {
		const value = 'abc1234';
		const max = 7;
		expect(ValidationUtils.maxLength(value, max)).toBe(false);
	});

	test('valid minLength inclusive', () => {
		const value = 'ab';
		const min = 2;
		expect(ValidationUtils.minLength(value, min, false)).toBe(true);
	});
	test('invalid minLength inclusive', () => {
		const value = 'a';
		const min = 2;
		expect(ValidationUtils.minLength(value, min, false)).toBe(false);
	});

	test('valid maxLength inclusive', () => {
		const value = 'abc1234';
		const max = 7;
		expect(ValidationUtils.maxLength(value, max, false)).toBe(true);
	});
	test('invalid maxLength inclusive', () => {
		const value = 'abcd1234';
		const max = 7;
		expect(ValidationUtils.maxLength(value, max, false)).toBe(false);
	});
});
