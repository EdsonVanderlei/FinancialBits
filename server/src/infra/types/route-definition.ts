export const enum HttpMethodEnum {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete',
}

export type RouteDefinition<T> = {
	path: string;
	httpMethod: HttpMethodEnum;
	methodName: keyof T;
	isAsync: boolean;
};
