import { AppError } from '../../../shared/classes/app-error';
import { UuidUtils } from '../../../shared/utils/uuid/uuid.utils';
import { DataObject } from '../data-object';

export class UUID extends DataObject<string> {
	constructor(value?: string, validate: boolean = true) {
		super(value === undefined ? UuidUtils.generate() : value);
		if (validate) this.validate();
	}
	
	public validate() {
		if (!UuidUtils.regex(this.value)) {
			throw new AppError('Invalid identifier', 400);
		}
	}
}
