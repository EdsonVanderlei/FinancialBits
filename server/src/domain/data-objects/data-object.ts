export abstract class DataObject<T> {
	constructor(public value: T) {}
	abstract validate(): void;
}
