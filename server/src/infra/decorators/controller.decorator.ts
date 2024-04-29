export const Controller = (prefix: string): ClassDecorator => {
	return <T extends Function>(constructor: T) => {
		Reflect.set(constructor, 'prefix', prefix);

		if (!Reflect.has(constructor, 'routes')) {
			Reflect.set(constructor, 'routes', []);
		}
	};
};
