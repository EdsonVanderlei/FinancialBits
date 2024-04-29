import { HttpMethodEnum } from '../enums/http-method.enum';

export type RouteDefinition = {
	path: string;
	httpMethod: HttpMethodEnum;
	methodName: string;
	isAsync: boolean;
};
