import { IsUUID } from 'class-validator';

export class DeleteCategoryRequestParams {
	@IsUUID()
	id: string;
}
