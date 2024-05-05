export const enum HttpMethodEnum {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete',
}

export type RouteDefinition = {
	path: string;
	httpMethod: HttpMethodEnum;
	methodName: string;
	isAsync: boolean;
};
