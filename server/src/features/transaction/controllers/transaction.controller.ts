import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	Param,
	Post,
	Query,
	Request,
	UseGuards,
} from '@nestjs/common';
import { Transaction } from 'src/entities/transaction.entity';
import { AuthGuard } from 'src/features/auth/guards/auth.guard';
import { WalletService } from 'src/features/wallet/services/wallet.service';
import { BaseRequest } from 'src/shared/types/base-request';
import { DateUtils } from 'src/shared/utils/date.utils';
import { Between, FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { TransactionService } from '../services/transaction.service';
import { CreateTransactionRequestBody } from '../types/create-transaction';
import { DeleteTransactionRequestParams } from '../types/delete-transaction';
import {
	GetAllTransactionsRequestQuery,
	GetAllTransactionsResponseBody,
} from '../types/get-all-transactions';
import {
	GroupedTransactionsResponse,
	TransactionResponse,
} from '../types/transaction-response';
import {
	UpdateTransactionRequestBody,
	UpdateTransactionRequestParams,
} from '../types/update-transaction';
import { CategoryService } from 'src/features/category/services/category.service';

@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionController {
	constructor(
		private walletService: WalletService,
		private categoryService: CategoryService,
		private transactionService: TransactionService,
	) {}

	private handleResponse = (transaction: Transaction): TransactionResponse => ({
		id: transaction.id,
		date: this.formatDate(transaction.date),
		title: transaction.title,
		value: transaction.value,
		createdAt: transaction.createdAt,
		updatedAt: transaction.updatedAt,
		wallet: {
			id: transaction.wallet.id,
			name: transaction.wallet.name,
			balance: transaction.wallet.balance,
			createdAt: transaction.wallet.createdAt,
			updatedAt: transaction.wallet.updatedAt,
		},
		category: transaction.category && {
			id: transaction.category.id,
			name: transaction.category.name,
			color: transaction.category.color,
			createdAt: transaction.category.createdAt,
			updatedAt: transaction.category.updatedAt,
		},
	});

	private formatDate = (date: Date) =>
		`${date.toISOString().split('T')[0]}T00:00:00`;

	@Get()
	@HttpCode(200)
	async getAll(
		@Request() req: BaseRequest,
		@Query() query: GetAllTransactionsRequestQuery,
	): Promise<GetAllTransactionsResponseBody> {
		const minDate = new Date(+query.minDate);
		const maxDate = new Date(+query.maxDate);

		const where: FindOptionsWhere<Transaction> = {
			user: { id: req.user.id },
			date: Between(minDate, maxDate),
		};
		const order: FindOptionsOrder<Transaction> = {
			date: 'desc',
			createdAt: 'desc',
		};

		const transactions = await this.transactionService.find(where, order);
		const response = transactions.map(this.handleResponse).reduce((acc, item) => {
			const group = acc.find(group => group.date === item.date);
			if (group) {
				group.values.push(item);
			} else {
				acc.push({ date: item.date, values: [item] });
			}
			return acc;
		}, [] as GroupedTransactionsResponse[]);

		return response;
	}

	@Post()
	@HttpCode(201)
	async create(
		@Request() req: BaseRequest,
		@Body() body: CreateTransactionRequestBody,
	): Promise<GroupedTransactionsResponse> {
		const wallet = await this.walletService.findById(body.walletId, req.user.id);
		if (!wallet) {
			throw new HttpException('wallet not found', 404);
		}

		if (
			!body.categoryId &&
			!this.categoryService.findOne({
				id: body.categoryId,
				user: { id: req.user.id },
			})
		) {
			throw new HttpException('category not found', 404);
		}

		const transaction = await this.transactionService.create({
			date: DateUtils.resetHours(body.date),
			title: body.title,
			value: body.value,
			walletId: wallet.id,
			userId: req.user.id,
			categoryId: body.categoryId,
		});
		await this.walletService.updateBalance(
			wallet.id,
			req.user.id,
			wallet.balance + transaction.value,
		);

		return {
			date: this.formatDate(transaction.date),
			values: [this.handleResponse(transaction)],
		};
	}

	@Post(':id')
	@HttpCode(200)
	async update(
		@Request() req: BaseRequest,
		@Param() params: UpdateTransactionRequestParams,
		@Body() body: UpdateTransactionRequestBody,
	): Promise<GroupedTransactionsResponse> {
		let transaction = await this.transactionService.findOne({
			id: params.id,
			user: { id: req.user.id },
		});
		if (!transaction) {
			throw new HttpException('transaction not found', 404);
		}

		const result = await this.transactionService.update(
			{ id: transaction.id, user: { id: req.user.id } },
			{
				date: body.date ? DateUtils.resetHours(body.date) : undefined,
				title: body.title,
				value: body.value,
				categoryId: body.categoryId,
			},
		);
		if (result.affected == 0) {
			throw new HttpException("couldn't update the transaction", 500);
		}

		if (typeof body.value !== 'undefined' && transaction.value !== body.value) {
			await this.walletService.updateBalance(
				transaction.wallet.id,
				req.user.id,
				transaction.wallet.balance - transaction.value + body.value,
			);
		}
		const newTransaction = await this.transactionService.findOne({
			id: transaction.id,
			user: { id: req.user.id },
		});

		return {
			date: this.formatDate(body.date ?? transaction.date),
			values: [this.handleResponse(newTransaction)],
		};
	}

	@Delete(':id')
	@HttpCode(204)
	async delete(
		@Request() req: BaseRequest,
		@Param() params: DeleteTransactionRequestParams,
	): Promise<void> {
		const transaction = await this.transactionService.findOne({
			id: params.id,
			user: { id: req.user.id },
		});
		if (!transaction) {
			throw new HttpException('transaction not found', 404);
		}

		const result = await this.transactionService.delete({
			id: transaction.id,
			user: { id: req.user.id },
		});
		if (result.affected == 0) {
			throw new HttpException("couldn't delete the transaction", 500);
		}

		this.walletService.updateBalance(
			transaction.wallet.id,
			req.user.id,
			transaction.wallet.balance - transaction.value,
		);
	}
}
