import { IsNotEmpty, IsUUID, Length } from 'class-validator';
import { CategoryResponse } from './category-response';

export class UpdateCategoryRequestParams {
	@IsUUID()
	id: string;
}

export class UpdateCategoryRequestBody {
	@IsNotEmpty()
	name: string;
	@IsNotEmpty()
	@Length(7)
	color: string;
}

export type UpdateCategoryResponseBody = CategoryResponse;
