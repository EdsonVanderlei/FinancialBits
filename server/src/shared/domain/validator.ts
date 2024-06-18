import { AppError } from '../classes/app-error';
import { DataObject } from './data-objects/data-object';

export abstract class Validator<T> {
	abstract validate(target: T): void;

	protected tryDataObject(dataObject: DataObject<unknown>, message?: string, statusCode?: number) {
		try {
			dataObject.validate();
		} catch (e: unknown) {
			if (e instanceof AppError) throw new AppError(message ?? e.message, statusCode ?? e.statusCode);
			Error('unknown error');
		}
	}
}
