export interface Validator<T> {
	validate(target: T): void;
}
