import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Transaction } from './transaction.entity';
import { User } from './user.entity';

@Entity({ name: 'categories' })
export class Category {
	@PrimaryGeneratedColumn('uuid') id: string;
	@Column() name: string;
	@Column({ length: 7 }) color: string;

	@CreateDateColumn({ name: 'created_at' }) createdAt: Date;
	@UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;

    @ManyToOne(() => User, u => u.categories, { nullable: false })
	user: User;
	@OneToMany(() => Transaction, t => t.category)
	transactions: Transaction[];
}
