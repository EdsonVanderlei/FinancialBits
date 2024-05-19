import { AppError } from '../../../shared/classes/app-error';
import { UUID } from './uuid';

describe('UUID', () => {
	test('Invalid identifier', () => {
		const input = 'b3b1af0c-a41668b5b2c0';
		const uuid = new UUID(input);

		expect(() => uuid.validate()).toThrow({
			statusCode: 400,
			message: 'Invalid identifier',
		} as AppError);
	});
});
