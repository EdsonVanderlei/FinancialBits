import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllRequestQuery {
	@IsOptional() @IsNumber() page?: number;
	@IsOptional() @IsNumber() pageSize?: number;

	@IsOptional() @IsString() sortField?: string;
	@IsOptional() @IsNumber() sortOrder?: number;
}