import { ConfigModule, ConfigService } from '@nestjs/config';
import {
	TypeOrmModuleAsyncOptions,
	TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Category } from 'src/entities/category';
import { Transaction } from 'src/entities/transaction.entity';
import { User } from 'src/entities/user.entity';
import { Wallet } from 'src/entities/wallet.entity';

export const typeOrmOptions: TypeOrmModuleAsyncOptions = {
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: async (config: ConfigService) =>
		({
			type: config.get('DATABASE_TYPE'),
			host: config.get('DATABASE_HOST'),
			port: config.get('DATABASE_PORT'),
			username: config.get('DATABASE_USER'),
			password: config.get('DATABASE_PASS'),
			database: config.get('DATABASE_NAME'),
			entities: [Category, Transaction, User, Wallet],
			synchronize: true,
			logging: true,
		}) as TypeOrmModuleOptions,
};
