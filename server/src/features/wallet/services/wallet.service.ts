import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from 'src/entities/wallet.entity';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class WalletService {
	constructor(
		@InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
	) {}

	async count(where: FindOptionsWhere<Wallet>) {
		return this.walletRepository.count({ where });
	}

	async find(where: FindOptionsWhere<Wallet>, order: FindOptionsOrder<Wallet>) {
		return this.walletRepository.find({ where, order });
	}

	async findById(id: string, userId: string) {
		return this.walletRepository.findOneBy({ id, user: { id: userId } });
	}

	async create(name: string, userId: string, balance?: number) {
		return this.walletRepository.save({ name, balance, user: { id: userId } });
	}

	async updateBalance(id: string, userId: string, balance: number) {
		return this.walletRepository.update(
			{ id: id, user: { id: userId } },
			{ balance },
		);
	}

	async updateName(id: string, userId: string, name: string) {
		return this.walletRepository.update(
			{ id: id, user: { id: userId } },
			{ name },
		);
	}

	async delete(id: string, userId: string) {
		return this.walletRepository.delete({ id: id, user: { id: userId } });
	}
}
