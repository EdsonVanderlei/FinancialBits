import { GetAllRequestQuery } from '../types/get-all-request-query';

export const controllerUtils = {
	getPagination: (query: GetAllRequestQuery) => {
		const page = typeof query.page !== 'undefined' ? query.page : 0;
		const pageSize = typeof query.pageSize !== 'undefined' ? query.pageSize : 10;
		return { page, pageSize };
	},
	getSort: (query: GetAllRequestQuery) => {
		const sortField = query.sortField ?? 'createdAt';
		const sortOrder = typeof query.sortOrder !== 'undefined' ? query.sortOrder : -1;
		return { [sortField]: sortOrder };
	},
};
