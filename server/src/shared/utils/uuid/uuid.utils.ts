import { v4, validate } from 'uuid';

export abstract class UuidUtils {
	static generate() {
		return v4();
	}
	static validate(value?: string | null) {
		return validate(value ?? '');
	}
}
