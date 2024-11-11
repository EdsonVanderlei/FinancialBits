import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Category } from './category';
import { Transaction } from './transaction.entity';
import { Wallet } from './wallet.entity';

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn('uuid') id: string;
	@Column() name: string;
	@Column({ unique: true }) email: string;
	@Column() password: string;

	@CreateDateColumn({ name: 'created_at' }) createdAt: Date;
	@UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;

	@OneToMany(() => Wallet, w => w.user)
	wallets: Wallet[];
	@OneToMany(() => Transaction, t => t.user)
	transactions: Transaction[];
	@OneToMany(() => Category, t => t.user)
	categories: Category[];
}
