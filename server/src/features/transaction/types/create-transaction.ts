import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsUUID, NotEquals } from 'class-validator';

export class CreateTransactionRequestBody {
	@IsNotEmpty()
	title: string;
	@IsNumber()
	@NotEquals(0)
	value: number;
	@IsDate()
	date: Date;
	@IsUUID()
	walletId: string;
	@IsUUID()
	@IsOptional()
	categoryId?: string | null;
}
