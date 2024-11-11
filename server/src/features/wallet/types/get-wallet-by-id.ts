import { IsUUID } from 'class-validator';
import { WalletResponse } from './wallet-response';

export class GetWalletByIdRequestParams {
	@IsUUID()
	id: string;
}

export type GetWalletByIdResponseBody = WalletResponse;
