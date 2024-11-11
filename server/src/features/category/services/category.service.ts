import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category)
		private categoryRepository: Repository<Category>,
	) {}

	async find(
		where: FindOptionsWhere<Category>,
		order: FindOptionsOrder<Category>,
	) {
		return this.categoryRepository.find({ where, order });
	}

	async findOne(where: FindOptionsWhere<Category>) {
		return this.categoryRepository.findOne({ where });
	}

	async create(userId: string, name: string, color: string) {
		return this.categoryRepository.save({ name, color, user: { id: userId } });
	}

	async update(id: string, userId: string, name: string, color: string) {
		return this.categoryRepository.update(
			{ id: id, user: { id: userId } },
			{ name, color },
		);
	}

	async delete(where: FindOptionsWhere<Category>) {
		return this.categoryRepository.delete(where);
	}
}
