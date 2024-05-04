import { UuidUtils } from './uuid.utils';

describe('UuidUtils', () => {
	test('valid regex', () => {
		const uuid = 'eb269a09-be09-4cf5-8a6f-34d8981e2460';
		expect(UuidUtils.regex(uuid)).toBeTruthy();
	});
	test('invalid regex', () => {
		const uuid = 'abc123';
		expect(UuidUtils.regex(uuid)).toBeFalsy();
	});

	test('generate', () => {
		const uuid = UuidUtils.generate();
		expect(uuid).toBeDefined();
	});

	test('valid', () => {
		const uuid = '31c65044-70fb-4af4-b791-a7bb2cf77d4f';
		const result = UuidUtils.validate(uuid);

		expect(result).toBe(true);
	});

	test('invalid', () => {
		const uuid = '31c65044-b791-a7bb2cf77d4f';
		const result = UuidUtils.validate(uuid);

		expect(result).toBe(false);
	});
});
