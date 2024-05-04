import { AuthMiddleware } from './infra/middlewares/auth.middleware';
import { configDotenv } from 'dotenv';
import { SessionInMemoryRepository } from './domain/repositories/in-memory/session/session-in-memory.repository';
import { TransactionInMemoryRepository } from './domain/repositories/in-memory/transaction/transaction-in-memory.repository';
import { UserInMemoryRepository } from './domain/repositories/in-memory/user/user-in-memory.repository';
import { App } from './infra/app';
import { AuthController } from './infra/controllers/auth.controller';
import { TransactionsController } from './infra/controllers/transactions.controller';
import { LoginUserUseCase } from './use-cases/auth/login-user/login-user.use-case';
import { LogoutUserUseCase } from './use-cases/auth/logout-user/logout-user.use-case';
import { RefreshTokenUseCase } from './use-cases/auth/refresh-token/refresh-token.use-case';
import { RegisterUserUseCase } from './use-cases/auth/register-user/register-user.use-case';
import { CreateTransactionUseCase } from './use-cases/transactions/create-transaction/create-transaction.use-case';
import { LoadTransactionsUseCase } from './use-cases/transactions/load-transactions/load-transactions.use-case';

configDotenv();
const port = parseInt(process.env.PORT!);
const accessSecretKey = process.env.ACCESS_TOKEN_SECRET!;
const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET!;

const server = new App(port);

const userRepository = new UserInMemoryRepository();
const sessionRepository = new SessionInMemoryRepository();
const transactionRepository = new TransactionInMemoryRepository();

const loginUserUseCase = new LoginUserUseCase(accessSecretKey,refreshSecretKey,userRepository,sessionRepository);
const logoutUserUseCase = new LogoutUserUseCase(userRepository, sessionRepository);
const registerUserUseCase = new RegisterUserUseCase(accessSecretKey,refreshSecretKey,userRepository,sessionRepository);
const refreshTokenUseCase = new RefreshTokenUseCase(accessSecretKey, refreshSecretKey);

const loadTransactionsUseCase = new LoadTransactionsUseCase(transactionRepository);
const createTransactionUseCase = new CreateTransactionUseCase(userRepository, transactionRepository);

const authMiddleware = new AuthMiddleware(accessSecretKey);

server.setController(new AuthController(loginUserUseCase, logoutUserUseCase, registerUserUseCase, refreshTokenUseCase));
server.setController(new TransactionsController(loadTransactionsUseCase, createTransactionUseCase), [authMiddleware.exec]);

server.listen();
