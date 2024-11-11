import {
	IsDate,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	NotEquals,
} from 'class-validator';
import { IsUUID } from 'class-validator';

export class UpdateTransactionRequestParams {
	@IsUUID()
	id: string;
}

export class UpdateTransactionRequestBody {
	@IsNotEmpty()
	@IsOptional()
	title?: string;
	@IsNumber()
	@NotEquals(0)
	@IsOptional()
	value?: number;
	@IsDate()
	@IsOptional()
	date?: Date;
	@IsUUID()
	@IsOptional()
	categoryId?: string | null;
}
