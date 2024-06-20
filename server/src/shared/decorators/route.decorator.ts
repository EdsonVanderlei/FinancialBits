import { RouteDefinition } from '../../app/types/route-definition';
import { HttpMethodEnum } from '../types/http.method.enum';

export const Route = (
	httpMethod: HttpMethodEnum,
	path: string,
	configurations: { isAsync: boolean } = { isAsync: true },
): MethodDecorator => {
	return <T>(parentClass: object, methodName: string | symbol) => {
		if (!Reflect.has(parentClass.constructor, 'routes')) {
			Reflect.set(parentClass.constructor, 'routes', []);
		}

		const routes: RouteDefinition<T>[] = Reflect.get(parentClass.constructor, 'routes');
		routes.push({
			httpMethod,
			path,
			methodName: methodName.toString() as keyof T,
			isAsync: configurations.isAsync,
		});
		Reflect.set(parentClass.constructor, 'routes', routes);
	};
};
