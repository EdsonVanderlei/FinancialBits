export abstract class ValidationUtils {
	static email(value?: string | null) {
		const regExp = new RegExp(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/);
		return regExp.test(value ?? '');
	}
	static jwt(value?: string | null) {
		const regExp = new RegExp(/(?:[\w-]*\.){2}[\w-]*/);
		return regExp.test(value ?? '');
	}
	static uuid(value?: string | null) {
		const regExp = new RegExp(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
		return regExp.test(value ?? '');
	}
	static minLength(value: string, min: number, exclusive: boolean = true) {
		if (exclusive) return value.length > min;
		return value.length >= min;
	}
	static maxLength(value: string, max: number, exclusive: boolean = true) {
		if (exclusive) return value.length < max;
		return value.length <= max;
	}
}
