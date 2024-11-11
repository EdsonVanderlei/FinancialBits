import { IsNotEmpty, Length } from 'class-validator';
import { CategoryResponse } from './category-response';

export class CreateCategoryRequestBody {
	@IsNotEmpty()
	name: string;
	@IsNotEmpty()
	@Length(7)
	color: string;
}

export type CreateCategoryResponseBody = CategoryResponse;
