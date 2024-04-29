import { AppError } from '../../classes/app-error';
import { ValidationUtils } from '../validation/validation.utils';
import { TokenUtils } from './token.utils';

describe('TokenUtils', () => {
	test('generate valid', async () => {
		const secret = 'secret';
		const payload = { email: 'johndoe@test.com' };
		const token = TokenUtils.generate(payload, secret);

		expect(ValidationUtils.jwt(token)).toBe(true);
	});
	test('generate invalid secret', async () => {
		const payload = { email: 'johndoe@test.com' };

		expect(() => TokenUtils.generate(payload, '')).toThrow({
			statusCode: 500,
			message: 'secretOrPrivateKey must have a value',
		} as AppError);
	});

	test('verify valid', async () => {
		const secret = 'secret';
		const payload = { email: 'johndoe@test.com' };
		const token = TokenUtils.generate(payload, secret);

		expect(TokenUtils.verify(token!, secret)).toBeTruthy();
	});
	test('verify invalid key', async () => {
		const secret = 'secret';
		const payload = { email: 'johndoe@test.com' };
		const token = TokenUtils.generate(payload, secret);

		expect(() => TokenUtils.verify(token, '')).toThrow({
			statusCode: 400,
			message: 'secret or public key must be provided',
		} as AppError);
	});
	test('verify invalid', async () => {
		const secret = 'secret';
		const token = 'abc';

		expect(() => TokenUtils.verify(token, secret)).toThrow({
			statusCode: 400,
			message: 'jwt malformed',
		} as AppError);
	});
	test('verify expirated', async () => {
		const secret = 'accessSecret';
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOiIxMjMiLCJpYXQiOjE3MTM3OTMxODMsImV4cCI6MTcxMzc5MzE5M30.MhgESSWWqx_nDmGq599CuodyYidpB8lUbdCX-ho9Rxg';

		expect(() => TokenUtils.verify(token, secret)).toThrow({
			statusCode: 400,
			message: 'jwt expired',
		} as AppError);
	});

	test('decode valid', () => {
		const secret = 'secret';
		const token = TokenUtils.generate({}, secret);

		expect(TokenUtils.decode(token)).toBeTruthy();
	});
	test('decode get payload', () => {
		const secret = 'secret';
		const payload = { email: 'johndoe@test.com' };
		const token = TokenUtils.generate(payload, secret);

		expect(TokenUtils.decode(token)!.email).toEqual('johndoe@test.com');
	});
	test('decode invalid', () => {
		const secret = 'secret';
		const token = TokenUtils.generate({}, secret);

		expect(TokenUtils.decode('')).toEqual(null);
	});
});
