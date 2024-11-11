import { IsNotEmpty, IsUUID } from 'class-validator';
import { WalletResponse } from './wallet-response';

export class UpdateWalletRequestParams {
	@IsUUID()
	id: string;
}

export class UpdateWalletRequestBody {
	@IsNotEmpty()
	name: string;
}

export type UpdateWalletResponseBody = WalletResponse;
