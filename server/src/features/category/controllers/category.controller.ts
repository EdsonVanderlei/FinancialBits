import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	Param,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { Category } from 'src/entities/category';
import { AuthGuard } from 'src/features/auth/guards/auth.guard';
import { TransactionService } from 'src/features/transaction/services/transaction.service';
import { BaseRequest } from 'src/shared/types/base-request';
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { CategoryService } from '../services/category.service';
import {
	CreateCategoryRequestBody,
	CreateCategoryResponseBody,
} from '../types/create-category';
import { DeleteCategoryRequestParams } from '../types/delete-category';
import { GetAllCategoriesResponseBody } from '../types/get-all-categories';
import {
	UpdateCategoryRequestBody,
	UpdateCategoryRequestParams,
	UpdateCategoryResponseBody,
} from '../types/update-category';

@UseGuards(AuthGuard)
@Controller('categories')
export class CategoryController {
	constructor(
		private transactionService: TransactionService,
		private categoryService: CategoryService,
	) {}

	private handleResponse = (category: Category) => ({
		id: category.id,
		name: category.name,
		color: category.color,
		createdAt: category.createdAt,
		updatedAt: category.updatedAt,
	});

	@Get('')
	@HttpCode(200)
	async getAll(
		@Request() req: BaseRequest,
	): Promise<GetAllCategoriesResponseBody> {
		const where: FindOptionsWhere<Category> = { user: { id: req.user.id } };
		const order: FindOptionsOrder<Category> = { createdAt: 'desc' };
		const categories = await this.categoryService.find(where, order);
		return categories.map(this.handleResponse);
	}

	@Post()
	@HttpCode(201)
	async create(
		@Request() req: BaseRequest,
		@Body() body: CreateCategoryRequestBody,
	): Promise<CreateCategoryResponseBody> {
		const category = await this.categoryService.create(
			req.user.id,
			body.name,
			body.color,
		);
		return this.handleResponse(category);
	}

	@Post(':id')
	@HttpCode(200)
	async update(
		@Request() req: BaseRequest,
		@Body() body: UpdateCategoryRequestBody,
		@Param() params: UpdateCategoryRequestParams,
	): Promise<UpdateCategoryResponseBody> {
		const category = await this.categoryService.findOne({
			id: params.id,
			user: { id: req.user.id },
		});
		if (!category) throw new HttpException('category not found', 404);

		await this.categoryService.update(
			params.id,
			req.user.id,
			body.name,
			body.color,
		);

		return this.handleResponse({
			...category,
			name: body.name,
			color: body.color,
		});
	}

	@Delete(':id')
	@HttpCode(204)
	async delete(
		@Request() req: BaseRequest,
		@Param() params: DeleteCategoryRequestParams,
	): Promise<void> {
		const category = await this.categoryService.findOne({
			id: params.id,
			user: { id: req.user.id },
		});
		if (!category) throw new HttpException('category not found', 404);

		await this.transactionService.update(
			{
				user: { id: req.user.id },
				category: { id: category.id },
			},
			{ categoryId: null },
		);

		await this.categoryService.delete({
			id: category.id,
			user: { id: req.user.id },
		});
	}
}
