import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';

@Entity({ name: 'wallets' })
export class Wallet {
	@PrimaryGeneratedColumn('uuid') id: string;
	@Column() name: string;
	@Column({ type: 'float', precision: 9, scale: 2, default: 0 }) balance: number;
	
	@CreateDateColumn({ name: 'created_at' }) createdAt: Date;
	@UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
	
	@ManyToOne(() => User, u => u.wallets, { nullable: false })
	user: User;
	@OneToMany(() => Transaction, t => t.wallet)
	transactions: Transaction[];
}
