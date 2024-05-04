import { v4, validate } from 'uuid';

export abstract class UuidUtils {
	static regex(value: string | undefined | null) {
		const regExp = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
		return regExp.test(value ?? '');
	}
	static generate() {
		return v4();
	}
	static validate(value?: string | null) {
		return validate(value ?? '');
	}
}
