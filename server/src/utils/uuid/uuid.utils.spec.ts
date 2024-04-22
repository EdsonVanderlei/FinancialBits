import { ValidationUtils } from '../validation/validation.utils';
import { UuidUtils } from './uuid.utils';

describe('UuidUtils tests', () => {
	test('generate', () => {
		const uuid = UuidUtils.generate();
		const result = ValidationUtils.uuid(uuid);

		expect(result).toBe(true);
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
