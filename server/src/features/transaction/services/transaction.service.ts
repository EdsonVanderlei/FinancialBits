import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/entities/transaction.entity';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class TransactionService {
	constructor(
		@InjectRepository(Transaction)
		private transactionRepository: Repository<Transaction>,
	) {}

	async find(
		where: FindOptionsWhere<Transaction>,
		order: FindOptionsOrder<Transaction>,
	) {
		return this.transactionRepository.find({
			where,
			order,
			relations: ['wallet', 'category'],
		});
	}

	async findOne(where: FindOptionsWhere<Transaction>) {
		return this.transactionRepository.findOne({
			where,
			relations: ['wallet', 'category'],
		});
	}

	async create(values: {
		date: Date;
		title: string;
		value: number;
		userId: string;
		walletId: string;
		categoryId?: string | null;
	}) {
		return this.transactionRepository.save({
			date: values.date,
			title: values.title,
			value: values.value,
			user: { id: values.userId },
			wallet: { id: values.walletId },
			category: { id: values.categoryId },
		});
	}

	async update(
		where: FindOptionsWhere<Transaction>,
		values: {
			date?: Date;
			title?: string;
			value?: number;
			categoryId?: string | null;
		},
	) {
		return this.transactionRepository.update(where, {
			date: values.date,
			title: values.title,
			value: values.value,
			category: values.categoryId && { id: values.categoryId },
		});
	}

	async delete(where: FindOptionsWhere<Transaction>) {
		return this.transactionRepository.delete(where);
	}

	async deleteByWalletId(walletId: string, userId: string) {
		return this.transactionRepository.delete({
			wallet: { id: walletId, user: { id: userId } },
		});
	}
}
