import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Wallet } from './wallet.entity';
import { User } from './user.entity';
import { Category } from './category';

@Entity({ name: 'transactions' })
export class Transaction {
	@PrimaryGeneratedColumn('uuid') id: string;
	@Column() title: string;
	@Column({ type: 'float', precision: 9, scale: 2, default: 0 }) value: number;
	@Column({ precision: 6 }) date: Date;

	@CreateDateColumn({ name: 'created_at' }) createdAt: Date;
	@UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;

	@ManyToOne(() => User, u => u.transactions, { nullable: false })
	user: User;
	@ManyToOne(() => Wallet, w => w.transactions, { nullable: false })
	wallet: Wallet;
	@ManyToOne(() => Category, c => c.transactions, { nullable: true })
	category: Category;
}
