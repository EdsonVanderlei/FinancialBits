import { HttpMethodEnum } from '../../shared/types/http.method.enum';

export type RouteDefinition<T> = {
	path: string;
	httpMethod: HttpMethodEnum;
	methodName: keyof T;
	isAsync: boolean;
};
