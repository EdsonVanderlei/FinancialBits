import { AppError } from '../../../classes/app-error';
import { UUID } from './uuid';

describe('UUID', () => {
	test('Create', () => {
		const input = '4508cda1-e177-4867-9a1b-4040146dad6e';

		expect(() => UUID.create(input)).not.toThrow();
	});
	test('Generate', () => {
		const uuid = UUID.generate();

		expect(uuid).toBeDefined();
		expect(() => uuid.validate()).not.toThrow();
	});
	test('Invalid identifier', () => {
		const input = '4508cda1-9a1b-4040146dad6e';

		expect(() => UUID.create(input)).toThrow({
			statusCode: 400,
			message: 'Invalid identifier',
		} as AppError);
	});
});
