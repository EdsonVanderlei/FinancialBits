import { HttpMethodEnum } from '../enums/http-method.enum';
import { RouteDefinition } from '../types/route-definition';

export const Route = (
	httpMethod: HttpMethodEnum,
	path: string,
	configurations: { isAsync: boolean } = { isAsync: true }
): MethodDecorator => {
	return <T>(parentClass: Object, methodName: string | symbol) => {
		if (!Reflect.has(parentClass.constructor, 'routes')) {
			Reflect.set(parentClass.constructor, 'routes', []);
		}

		const routes: RouteDefinition[] = Reflect.get(parentClass.constructor, 'routes');
		routes.push({
			httpMethod,
			path,
			methodName: methodName.toString(),
			isAsync: configurations.isAsync,
		});
		Reflect.set(parentClass.constructor, 'routes', routes);
	};
};
