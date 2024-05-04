import { AppError } from '../../../shared/classes/app-error';
import { UuidUtils } from '../../../shared/utils/uuid/uuid.utils';
import { UUID } from './uuid';

describe('UUID', () => {
	test('construct', () => {
		const input = 'b3b1af0c-3679-476f-b4f8-a41668b5b2c0';
		const uuid = new UUID(input);
		expect(uuid.value).toEqual(input);
		expect(UuidUtils.regex(uuid.value)).toBeTruthy();
	});
	test('invalid', () => {
		const input = 'b3b1af0c-a41668b5b2c0';
		expect(() => new UUID(input)).toThrow({
			statusCode: 400,
			message: 'Invalid identifier',
		} as AppError);
	});
	test('skip validation', () => {
		const input = 'b3b1af0c-3679-a41668b5b2c0';
		const uuid = new UUID(input, false);
		expect(uuid.value).toEqual(input);
		expect(UuidUtils.regex(uuid.value)).toBeFalsy();
	});
});
