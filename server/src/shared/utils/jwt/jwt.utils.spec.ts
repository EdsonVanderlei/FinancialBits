import { AppError } from '../../classes/app-error';
import { JWTUtils } from './jwt.utils';

describe('JWTUtils', () => {
	test('regex valid', async () => {
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOiIxMjMiLCJpYXQiOjE3MTM3OTMxODMsImV4cCI6MTcxMzc5MzE5M30.MhgESSWWqx_nDmGq599CuodyYidpB8lUbdCX-ho9Rxg';
		const result = JWTUtils.regex(token);

		expect(result).toBeTruthy();
	});
	test('regex invalid ', async () => {
		const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MhgESSWWqx_nDmGq599CuodyYidpB8lUbdCX-ho9Rxg';
		const result = JWTUtils.regex(token);

		expect(result).toBeFalsy();
	});

	test('generate valid', async () => {
		const secret = 'secret';
		const payload = { email: 'johndoe@test.com' };
		const token = JWTUtils.generate(payload, secret);

		expect(token).toBeDefined();
	});
	test('generate invalid secret', async () => {
		const payload = { email: 'johndoe@test.com' };

		expect(() => JWTUtils.generate(payload, '')).toThrow({
			statusCode: 500,
			message: 'secretOrPrivateKey must have a value',
		} as AppError);
	});

	test('verify valid', async () => {
		const secret = 'secret';
		const payload = { email: 'johndoe@test.com' };
		const token = JWTUtils.generate(payload, secret);

		expect(JWTUtils.verify(token!, secret)).toBeTruthy();
	});
	test('verify invalid key', async () => {
		const secret = 'secret';
		const payload = { email: 'johndoe@test.com' };
		const token = JWTUtils.generate(payload, secret);

		expect(() => JWTUtils.verify(token, '')).toThrow({
			statusCode: 400,
			message: 'secret or public key must be provided',
		} as AppError);
	});
	test('verify invalid', async () => {
		const secret = 'secret';
		const token = 'abc';

		expect(() => JWTUtils.verify(token, secret)).toThrow({
			statusCode: 400,
			message: 'jwt malformed',
		} as AppError);
	});
	test('verify expirated', async () => {
		const secret = 'accessSecret';
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOiIxMjMiLCJpYXQiOjE3MTM3OTMxODMsImV4cCI6MTcxMzc5MzE5M30.MhgESSWWqx_nDmGq599CuodyYidpB8lUbdCX-ho9Rxg';

		expect(() => JWTUtils.verify(token, secret)).toThrow({
			statusCode: 400,
			message: 'Token expired',
		} as AppError);
	});

	test('decode valid', () => {
		const secret = 'secret';
		const token = JWTUtils.generate({}, secret);

		expect(JWTUtils.decode(token)).toBeTruthy();
	});
	test('decode get payload', () => {
		const secret = 'secret';
		const payload = { email: 'johndoe@test.com' };
		const token = JWTUtils.generate(payload, secret);

		expect(JWTUtils.decode(token)!.email).toEqual('johndoe@test.com');
	});
	test('decode invalid', () => {
		const secret = 'secret';
		const token = JWTUtils.generate({}, secret);

		expect(JWTUtils.decode('')).toEqual(null);
	});
});
