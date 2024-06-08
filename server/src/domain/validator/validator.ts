import { AppError } from '../../shared/classes/app-error';
import { DataObject } from '../data-objects/data-object';

export abstract class Validator<T> {
	abstract validate(target: T): void;

	protected tryDataObject(dataObject: DataObject<any>, message?: string, statusCode?: number) {
		try {
			dataObject.validate();
		} catch (e: any) {
			throw new AppError(message ?? e.message, statusCode ?? e.statusCode);
		}
	}
}
