/* eslint-disable @typescript-eslint/ban-types */
export const Controller =
	(prefix: string): ClassDecorator =>
	(constructor: Function) => {
		Reflect.set(constructor, 'prefix', prefix);

		if (!Reflect.has(constructor, 'routes')) {
			Reflect.set(constructor, 'routes', []);
		}
	};
