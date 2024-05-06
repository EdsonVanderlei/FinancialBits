export abstract class StringUtils {
	static camelToSnake(value: string) {
		return value.replace(/[A-Z]/g, match => '_' + match.toLowerCase());
	}
	static snakeToCamel(value: string) {
		return value.replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''));
	}
}
