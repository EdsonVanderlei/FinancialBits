import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtOptions } from './config/jwt.options';
import { typeOrmOptions } from './config/type-orm.options';
import { Category } from './entities/category';
import { Transaction } from './entities/transaction.entity';
import { User } from './entities/user.entity';
import { Wallet } from './entities/wallet.entity';
import { AuthController } from './features/auth/controllers/auth.controller';
import { AuthGuard } from './features/auth/guards/auth.guard';
import { TokensService } from './features/auth/services/tokens.service';
import { UserService } from './features/auth/services/user.service';
import { CategoryController } from './features/category/controllers/category.controller';
import { CategoryService } from './features/category/services/category.service';
import { TransactionController } from './features/transaction/controllers/transaction.controller';
import { TransactionService } from './features/transaction/services/transaction.service';
import { WalletController } from './features/wallet/controllers/wallet.controller';
import { WalletService } from './features/wallet/services/wallet.service';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync(typeOrmOptions),
		TypeOrmModule.forFeature([User, Category, Wallet, Transaction]),
		JwtModule.register(jwtOptions),
		ConfigModule,
	],
	controllers: [
		AuthController,
		CategoryController,
		TransactionController,
		WalletController,
	],
	providers: [
		UserService,
		TokensService,
		AuthGuard,
		CategoryService,
		TransactionService,
		WalletService,
	],
})
export class AppModule {}
