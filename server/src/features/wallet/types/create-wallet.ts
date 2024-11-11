import { IsNotEmpty, IsNumber, IsOptional, Max, Min, NotEquals } from 'class-validator';
import { WalletResponse } from './wallet-response';

export class CreateWalletRequestBody {
	@IsNotEmpty()
	name: string;
	@IsNumber()
	@NotEquals(0)
	@IsOptional()
	balance?: number;
}

export type CreateWalletResponseBody = WalletResponse;
