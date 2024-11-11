import { IsUUID } from 'class-validator';

export class DeleteTransactionRequestParams {
	@IsUUID()
	id: string;
}
