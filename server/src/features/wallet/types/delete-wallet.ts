import { IsUUID } from 'class-validator';

export class DeleteWalletRequestParams {
	@IsUUID()
	id: string;
}
