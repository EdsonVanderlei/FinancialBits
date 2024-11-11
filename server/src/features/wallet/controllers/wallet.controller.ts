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
import { Wallet } from 'src/entities/wallet.entity';
import { AuthGuard } from 'src/features/auth/guards/auth.guard';
import { TransactionService } from 'src/features/transaction/services/transaction.service';
import { BaseRequest } from 'src/shared/types/base-request';
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { WalletService } from '../services/wallet.service';
import { CreateWalletRequestBody, CreateWalletResponseBody } from '../types/create-wallet';
import { DeleteWalletRequestParams } from '../types/delete-wallet';
import { GetAllWalletsResponseBody } from '../types/get-all-wallets';
import { UpdateWalletRequestBody, UpdateWalletRequestParams, UpdateWalletResponseBody } from '../types/update-wallet';
import { GetWalletByIdRequestParams, GetWalletByIdResponseBody } from '../types/get-wallet-by-id';

@UseGuards(AuthGuard)
@Controller('wallets')
export class WalletController {
	constructor(
		private transactionService: TransactionService,
		private walletService: WalletService,
	) {}

	private handleResponse = (wallet: Wallet) => ({
		id: wallet.id,
		name: wallet.name,
		balance: wallet.balance,
		createdAt: wallet.createdAt,
		updatedAt: wallet.updatedAt,
	});

	@Get('')
	@HttpCode(200)
	async getAll(@Request() req: BaseRequest): Promise<GetAllWalletsResponseBody> {
		const where: FindOptionsWhere<Wallet> = { user: { id: req.user.id } };
		const order: FindOptionsOrder<Wallet> = { updatedAt: 'desc' };
		const wallets = await this.walletService.find(where, order);
		return wallets.map(this.handleResponse);
	}

	@Get(':id')
	@HttpCode(200)
	async getById(
		@Request() req: BaseRequest,
		@Param() params: GetWalletByIdRequestParams,
	): Promise<GetWalletByIdResponseBody> {
		const wallet = await this.walletService.findById(params.id, req.user.id);
		if (!wallet) throw new HttpException('wallet not found', 404);
		return this.handleResponse(wallet);
	}

	@Post()
	@HttpCode(201)
	async create(@Request() req: BaseRequest, @Body() body: CreateWalletRequestBody): Promise<CreateWalletResponseBody> {
		const wallet = await this.walletService.create(body.name, req.user.id, body.balance ?? undefined);
		return this.handleResponse(wallet);
	}

	@Post(':id')
	@HttpCode(200)
	async update(
		@Request() req: BaseRequest,
		@Body() body: UpdateWalletRequestBody,
		@Param() params: UpdateWalletRequestParams,
	): Promise<UpdateWalletResponseBody> {
		const wallet = await this.walletService.findById(params.id, req.user.id);
		if (!wallet) throw new HttpException('wallet not found', 404);
		await this.walletService.updateName(wallet.id, req.user.id, body.name);
		return this.handleResponse({ ...wallet, name: body.name });
	}

	@Delete(':id')
	@HttpCode(204)
	async delete(@Request() req: BaseRequest, @Param() params: DeleteWalletRequestParams): Promise<void> {
		const wallet = await this.walletService.findById(params.id, req.user.id);
		if (!wallet) throw new HttpException('wallet not found', 404);
		await this.transactionService.deleteByWalletId(wallet.id, req.user.id);
		await this.walletService.delete(wallet.id, req.user.id);
	}
}
